import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class MainControlSeekViewModel {
  constructor(private readonly bridge: awm.Bridge) {}

  @mobx.action
  attach() {
    this.bridge.addEventHandler(this._onEvent.bind(this));
    return this;
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

  @mobx.computed
  get displayTime() {
    return awe.shared.formatTime(this.currentTime);
  }

  @mobx.observable
  currentBuffer = 0;

  @mobx.observable
  currentDuration = 0;

  @mobx.observable
  currentTime = 0;

  @mobx.observable
  isPreview = false;

  @mobx.action
  private _onEvent(event: awm.VideoEvent) {
    switch (event.type) {
      case 'timeupdate':
        this.currentBuffer = Math.floor(event.buffer);
        this.currentDuration = Math.floor(event.duration);
        if (!this.isPreview) this.currentTime = Math.floor(event.time);
        break;
      case 'waiting':
        this.currentBuffer = 0;
        break;
    }
  }
}
