import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class MainControlViewModel {
  constructor(
    private readonly bridge: awm.Bridge,
    private readonly navigator: awm.INavigator
  ) {}

  @mobx.action
  attach() {
    this.bridge.addEventHandler(this._onEvent.bind(this));
    this.seek.attach();
    return this;
  }

  @mobx.action
  openNext() {
    this.navigator.openNext();
  }
  
  @mobx.action
  openPrevious() {
    this.navigator.openPrevious();
  }

  @mobx.action
  seekForward() {
    const time = this.currentTime + awe.shared.settings.seekForward;
    this.bridge.dispatchRequest({type: 'seek', time});
  }

  @mobx.action
  seekRewind() {
    const time = this.currentTime - awe.shared.settings.seekRewind;
    this.bridge.dispatchRequest({type: 'seek', time});
  }

  @mobx.action
  togglePlay() {
    this.bridge.dispatchRequest(this.isPlaying
      ? {type: 'pause'}
      : {type: 'play'});
  }

  @mobx.computed
  get canSeek() {
    return Boolean(this.currentDuration);
  }

  @mobx.computed
  get hasNext() {
    return this.navigator.hasNext;
  }

  @mobx.computed
  get hasPrevious() {
    return this.navigator.hasPrevious;
  }

  @mobx.observable
  currentDuration = 0;

  @mobx.observable
  currentTime = 0;

  @mobx.observable
  isPlaying = true;

  @mobx.observable
  readonly seek = new awm.MainControlSeekViewModel(this.bridge);

  @mobx.action
  private _onEvent(event: awm.VideoEvent) {
    switch (event.type) {
      case 'loadedmetadata':
        this.currentDuration = event.duration;
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
