import * as ace from 'animesync';
import * as awe from '../..';
import * as mobx from 'mobx';

export class StreamViewModel {
  constructor(
    readonly bridge: awe.session.Bridge,
    readonly url: string
  ) {}
  
  @mobx.action
  attach() {
    this.bridge.addEventHandler(this._onEvent.bind(this));
    return this;
  }

  @mobx.action
  async refreshAsync() {
    const result = await awe.shared.core.api.remote.streamAsync({url: this.url});
    if (result.value) {
      this._requestStream(result.value);
      this._requestSubtitle(result.value.subtitles.find(x => x.language === 'eng'));
    } else {
      throw new Error('TODO');
    }
  }

  private _onEvent(event: awe.session.VideoEvent) {
    switch (event.type) {
      case 'ready':
        this.refreshAsync();
        break;
    }
  }

  private _requestStream(stream: ace.api.RemoteStream) {
    switch (stream.type) {
      case 'hls':
        this.bridge.dispatchRequest({type: 'stream', videoType: 'application/x-mpegURL', url: stream.url});
        break;
      default:
        throw new Error();
    }
  }

  private _requestSubtitle(subtitle?: ace.api.RemoteStreamSubtitle) {
    switch (subtitle?.type) {
      case 'ass':
        this.bridge.dispatchRequest({type: 'subtitle', subtitleType: 'ass', url: subtitle.url});
        break;
      case 'vtt':
        this.bridge.dispatchRequest({type: 'subtitle', subtitleType: 'vtt', url: subtitle.url});
        break;
      default:
        throw new Error();
    }
  }
}
