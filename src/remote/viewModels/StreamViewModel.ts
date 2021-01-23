import * as awe from '../..';
import * as mobx from 'mobx';
import {language} from '../language';

export class StreamViewModel implements awe.session.IBridgeHandler {
  constructor(
    readonly bridge: awe.session.Bridge,
    readonly url: string
  ) {}
  
  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    return this;
  }

  @mobx.action
  onVideoEvent(event: awe.session.VideoEvent) {
    switch (event.type) {
      case 'ready':
        this.refreshAsync();
        break;
    }
  }

  @mobx.action
  async refreshAsync() {
    const result = await awe.shared.core.api.remote.streamAsync({url: this.url});
    if (result.value) {
      const subtitles = result.value.subtitles.map(subtitle => ({displayName: language[subtitle.language], ...subtitle}));
      this.bridge.dispatchRequest({type: 'loadStream', videoType: 'application/x-mpegURL', url: result.value.url});
      this.bridge.dispatchRequest({type: 'subtitles', subtitles});
    } else {
      throw new Error('TODO');
    }
  }
}
