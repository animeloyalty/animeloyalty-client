import * as app from '..';
import * as mobx from 'mobx';
import * as sub from 'subtitle';
import {language} from '../language';
import {session} from '../..';
import JSZip from 'jszip';

export class StreamViewModel extends app.BaseViewModel implements session.IVideoHandler {
  private navigationTimeout?: NodeJS.Timeout;
  
  constructor(
    readonly bridge: session.Bridge,
    readonly navigator: session.INavigator,
    readonly seriesId: string,
    readonly episodeId: string,
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
      case 'progress':
        if (!this.hasError) this.numberOfWarnings = 0;
        break;
      case 'warning':
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
    const result = await app.core.api.library.episodeAsync(this);
    const sources: Array<session.ISource> = [{urls: [result], type: 'mkv'}];

    const subtitleUrl = await app.core.api.library.episodeSubtitleAsync(this);
    const subtitleBlob = await fetch(subtitleUrl).then(x => x.arrayBuffer());
    const zip = await new JSZip().loadAsync(subtitleBlob);
    const subtitles: Array<session.ISubtitle> = [];

    console.log(zip.files);
    for (const [k, v] of Object.entries(zip.files).filter(x => x[0].includes('.eng.'))) { // WHAAA
      const match = k.match(/\.([a-z]{3})\.(ass|srt)$/);
      if (!match) continue;
      // const languageCode = match[1];
      const type = match[2];
      const text = await v.async('string');
      let url: string;

      if (type === 'srt') {
        const nodes = sub.parseSync(text);
        const result = sub.stringifySync(nodes, {format: 'WebVTT'});
        const typedBlobby = new Blob([result], {type : 'text/vtt'});
        url = URL.createObjectURL(typedBlobby);
      } else {
        const typedBlobby = new Blob([text], {type : 'text/ass'});
        url = URL.createObjectURL(typedBlobby);
      }

      subtitles.push({
        language: 'en-US', // WRONG BUT WHATEVER,
        type: type as any,
        url: url
      });
      break; // BECAUSE BUUGGGS
    }

    if (result) {
      this.bridge.dispatchRequest({type: 'sources', sources});
      this.bridge.dispatchRequest({type: 'subtitles', subtitles});
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
