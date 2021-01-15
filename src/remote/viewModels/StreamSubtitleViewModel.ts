import * as app from '..';
import * as mobx from 'mobx';

export class StreamSubtitleViewModel {
  constructor(subtitle: app.RemoteStreamSubtitle) {
    this.language = subtitle.language;
    this.type = subtitle.type;
    this.url = subtitle.url;
  }

  @mobx.observable
  language: app.RemoteStreamSubtitle['language'];

  @mobx.observable
  type: app.RemoteStreamSubtitle['type'];

  @mobx.observable
  url: app.RemoteStreamSubtitle['url'];
}
