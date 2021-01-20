import * as awm from '..';
import * as mobx from 'mobx';

export class MainControlViewModel {
  constructor(private readonly bridge: awm.Bridge) {}

  @mobx.action
  attach() {
    this.bridge.addEventHandler(this._onEvent.bind(this));
    this.seek.attach();
    return this;
  }

  @mobx.action
  togglePlay() {
    this.bridge.dispatchRequest(this.isPlaying
      ? {type: 'pause'}
      : {type: 'play'});
  }

  @mobx.computed
  get canSeek() {
    return this.showTimer;
  }

  @mobx.computed
  get displayTime() {
    return `${awm.formatTime(this.currentTime)} / ${awm.formatTime(this.currentDuration)}`;
  }

  @mobx.observable
  currentDuration = 0;

  @mobx.observable
  currentTime = 0;

  @mobx.observable
  isPlaying = true;

  @mobx.observable
  showTimer = false;

  @mobx.observable
  readonly seek = new awm.MainSeekViewModel(this.bridge);

  @mobx.action
  private _onEvent(event: awm.VideoEvent) {
    switch (event.type) {
      case 'loadeddata':
        this.showTimer = true;
        break;
      case 'play':
        this.isPlaying = true;
        break;
      case 'pause':
        this.isPlaying = false;
        break;
      case 'timeupdate':
        this.currentDuration = event.duration;
        this.currentTime = event.time;
        break;
      case 'waiting':
        this.currentTime = event.time;
        break;
    }
  }
}
