import * as app from '..';
import * as mobx from 'mobx';

export class StreamViewModel {
  constructor(url: string) {
    this.subtitles = [];
    this.type = 'hls';
    this.url = url;
  }

  @mobx.action
  async refreshAsync() {
    await app.core.screen.loadAsync(async () => {
      const result = await app.core.api.remote.streamAsync({url: this.url});
      if (result.value) {
        this.subtitles = result.value.subtitles.map((subtitle) => new app.StreamSubtitleViewModel(subtitle));
        this.type = result.value.type;
        this.url = result.value.url;
      } else {
        throw new Error('TODO');
      }
    });
  }

  @mobx.observable
  subtitles: Array<app.StreamSubtitleViewModel>;

  @mobx.observable
  type: app.RemoteStream['type'];

  @mobx.observable
  url: app.RemoteStream['url'];
}
