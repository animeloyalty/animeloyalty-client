import * as app from '..';
import * as mobx from 'mobx';

export class MainControlSeekViewModel implements app.IBridgeHandler {
  constructor(private readonly bridge: app.Bridge) {}

  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    return this;
  }

  @mobx.action
  onVideoEvent(event: app.VideoEvent) {
    switch (event.type) {
      case 'seeking':
        if (!this.isPreview) this.currentTime = event.time;
        break;
      case 'timeupdate':
        this.currentBuffer = event.buffer;
        this.currentDuration = event.duration;
        if (!this.isPreview) this.currentTime = event.time;
        break;
      case 'waiting':
        if (!this.isPreview) this.currentTime = event.time;
        break;
    }
  }

  @mobx.action
  seekStart(time: number) {
    this.currentTime = time;
    this.isPreview = true;
  }

  @mobx.action
  seekStop(time: number) {
    this.bridge.dispatchRequest({type: 'seek', time});
    this.currentTime = time;
    this.isPreview = false;
  }

  @mobx.observable
  currentBuffer = 0;

  @mobx.observable
  currentDuration = 0;

  @mobx.observable
  currentTime = 0;

  @mobx.observable
  isPreview = false;
}
