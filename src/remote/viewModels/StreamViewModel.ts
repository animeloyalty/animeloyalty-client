import * as app from '..';
import * as mobx from 'mobx';
import {session} from '../..';

export class StreamViewModel implements session.IBridgeHandler {
  private navigationTimeout?: NodeJS.Timeout;
  
  constructor(
    readonly bridge: session.Bridge,
    readonly url: string,
    readonly skipDelay = true
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
        this.schedule();
        break;
      case 'destroy':
        this.clearSchedule();
        break;
    }
  }

  @mobx.action
  async loadAsync() {
    const result = await app.core.api.remote.streamAsync({url: this.url});
    if (result.value) {
      this.bridge.dispatchRequest({type: 'loadStream', videoType: 'application/x-mpegURL', url: result.value.url});
      this.bridge.dispatchRequest({type: 'subtitles', subtitles: result.value.subtitles});
    } else {
      throw new Error('TODO');
    }
  }

  private clearSchedule() {
    if (!this.navigationTimeout) return;
    clearTimeout(this.navigationTimeout);
  }

  private schedule() {
    if (!this.skipDelay) {
      this.clearSchedule();
      this.navigationTimeout = setTimeout(() => this.loadAsync(), app.settings.navigationTimeout);
    } else {
      this.loadAsync();
    }
  }
}
