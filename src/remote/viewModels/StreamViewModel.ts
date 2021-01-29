import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';
import {session} from '../..';

export class StreamViewModel extends app.BaseViewModel implements session.IBridgeHandler {
  private navigationTimeout?: NodeJS.Timeout;
  
  constructor(
    readonly bridge: session.Bridge,
    readonly url: string,
    readonly skipDelay = true
  ) {super()}
  
  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    return this;
  }

  @mobx.action
  onVideoEvent(event: session.VideoEvent) {
    switch (event.type) {
      case 'create':
        this.schedule();
        break;
      case 'destroy':
        this.removeSchedule();
        break;
      case 'error':
        this.onError();
        break;
    }
  }

  @mobx.action
  async loadAsync() {
    const result = await app.core.api.remote.streamAsync({url: this.url});
    if (result.value) {
      this.bridge.dispatchRequest({type: 'loadStream', videoType: 'application/x-mpegURL', url: result.value.url});
      this.bridge.dispatchRequest({type: 'subtitles', subtitles: result.value.subtitles});
    } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorStreamBody, language.errorStreamButtons)) {
      await this.loadAsync();
    } else if (this.isViewMounted) {
      app.core.view.leave();
    }
  }

  @mobx.action
  private onError() {
    app.core.dialog.openAsync(language.errorSessionBody, language.errorStreamButtons).then((x) => x
      ? this.loadAsync()
      : app.core.view.leave());
  }

  @mobx.action
  private removeSchedule() {
    if (!this.navigationTimeout) return;
    clearTimeout(this.navigationTimeout);
  }

  @mobx.action
  private schedule() {
    if (!this.skipDelay) {
      this.removeSchedule();
      this.navigationTimeout = setTimeout(() => this.loadAsync(), app.settings.navigationTimeout);
    } else {
      this.loadAsync();
    }
  }
}
