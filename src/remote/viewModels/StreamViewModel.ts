import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';
import {session} from '../..';

export class StreamViewModel extends app.BaseViewModel implements session.IVideoHandler {
  private navigationTimeout?: NodeJS.Timeout;
  
  constructor(
    readonly bridge: session.Bridge,
    readonly navigator: session.INavigator,
    readonly url: string,
    readonly shouldDelay = false
  ) {super()}
  
  @mobx.action
  onVideoEvent(event: session.VideoEvent) {
    switch (event.type) {
      case 'create':
        this.schedule();
        break;
      case 'error':
        this.onError();
        break;
      case 'retryplaylist':
        this.onWarning();
        break;
    }
  }

  @mobx.action
  onViewMount() {
    super.onViewMount();
    this.bridge.subscribe(this);
  }

  @mobx.action
  onViewUnmount() {
    super.onViewUnmount();
    this.bridge.unsubscribe(this);
    this.removeSchedule();
  }

  @mobx.action
  async refreshAsync(): Promise<boolean> {
    const result = await app.core.api.remote.streamAsync({url: this.url});
    if (result.value) {
      this.bridge.dispatchRequest({type: 'sources', sources: groupQualities(result.value.sources)});
      this.bridge.dispatchRequest({type: 'subtitles', subtitles: result.value.subtitles});
      return true;
    } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorStreamBody, language.errorStreamButtons)) {
      return await this.refreshAsync();
    } else if (this.isViewMounted) {
      app.core.view.leave();
      return false;
    } else {
      return false;
    }
  }

  @mobx.observable
  private hasError = false;

  @mobx.observable
  private numberOfWarnings = 0;
  
  @mobx.action
  private onError() {
    if (!this.hasError) return this.tryRecover();
    app.core.dialog.openAsync(language.errorSessionBody, language.errorStreamButtons).then((x) => x
      ? this.tryRecover()
      : app.core.view.leave());
  }

  @mobx.action
  private onWarning() {
    this.numberOfWarnings++;
    if (this.numberOfWarnings !== 3) return;
    this.onError();
  }

  @mobx.action
  private removeSchedule() {
    if (!this.navigationTimeout) return;
    clearTimeout(this.navigationTimeout);
  }

  @mobx.action
  private schedule() {
    if (this.shouldDelay) {
      this.removeSchedule();
      this.navigationTimeout = setTimeout(() => this.refreshAsync(), app.settings.navigationTimeout);
    } else {
      this.refreshAsync();
    }
  }

  @mobx.action
  private tryRecover() {
    this.hasError = true;
    this.refreshAsync().then((success) => {
      if (!success) return this.onError();
      this.hasError = false;
      this.numberOfWarnings = 0;
    });
  }
}

function groupQualities(sources: Array<app.api.RemoteStreamSource>) {
  return sources.reduce((p, s) => {
    const c = p.find(x => x.resolutionX === s.resolutionX && x.resolutionY === s.resolutionY);
    if (c) return c.urls.push(s.url) ? p : p;
    return p.concat({bandwidth: s.bandwidth, resolutionX: s.resolutionX, resolutionY: s.resolutionY, urls: [s.url]});
  }, [] as Array<session.ISource>)
}
