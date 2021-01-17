import * as ace from 'animesync';
import * as mobx from 'mobx';

export class StreamSubtitleViewModel {
  constructor(subtitle: ace.api.RemoteStreamSubtitle) {
    this.language = subtitle.language;
    this.type = subtitle.type;
    this.url = subtitle.url;
  }

  @mobx.observable
  language: ace.api.RemoteStreamSubtitle['language'];

  @mobx.observable
  type: ace.api.RemoteStreamSubtitle['type'];

  @mobx.observable
  url: ace.api.RemoteStreamSubtitle['url'];
}
