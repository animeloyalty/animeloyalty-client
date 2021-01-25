import * as app from '..';
import * as mobx from 'mobx';
import {session} from '../..';

export class StreamViewModel implements session.IBridgeHandler {
  constructor(
    readonly bridge: session.Bridge,
    readonly url: string
  ) {}
  
  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    return this;
  }

  @mobx.action
  onVideoEvent(event: session.VideoEvent) {
    switch (event.type) {
      case 'create':
        this.refreshAsync();
        break;
    }
  }

  @mobx.action
  async refreshAsync() {
    const result = await app.core.api.remote.streamAsync({url: this.url});
    if (result.value) {
      this.bridge.dispatchRequest({type: 'loadStream', videoType: 'application/x-mpegURL', url: result.value.url});
      this.bridge.dispatchRequest({type: 'subtitles', subtitles: result.value.subtitles});
    } else {
      throw new Error('TODO');
    }
  }
}
