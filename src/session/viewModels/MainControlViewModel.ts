import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class MainControlViewModel implements awe.shared.IInputHandler, awm.IBridgeHandler {
  constructor(
    private readonly bridge: awm.Bridge,
    private readonly navigator: awm.INavigator
  ) {}

  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    this.seek.attach();
    this.subtitle.attach();
    return this;
  }

  @mobx.action
  onInputKey(event: awe.shared.InputKeyEvent) {
    if (event.type === 'enter') {
      this.togglePlay();
      return true;
    } else if (event.type === 'arrowLeft') {
      this.seekRewind();
      return true;
    } else if (event.type === 'arrowRight') {
      this.seekForward();
      return true;
    } else {
      return false;
    }
  }
  
  @mobx.action
  onVideoEvent(event: awm.VideoEvent) {
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
  
  @mobx.action
  openNext() {
    if (!this.navigator.hasNext) return;
    this.navigator.openNext();
  }
  
  @mobx.action
  openPrevious() {
    if (!this.navigator.hasPrevious) return;
    this.navigator.openPrevious();
  }

  @mobx.action
  seekForward() {
    if (!this.canSeek) return;
    const time = this.currentTime + awe.shared.settings.seekForward;
    this.bridge.dispatchRequest({type: 'seek', time});
  }

  @mobx.action
  seekRewind() {
    if (!this.canSeek) return;
    const time = this.currentTime - awe.shared.settings.seekRewind;
    this.bridge.dispatchRequest({type: 'seek', time});
  }

  @mobx.action
  togglePlay() {
    if (!this.canSeek) return;
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
  
  @mobx.observable
  readonly subtitle = new awm.MainControlSubtitleViewModel(this.bridge);
}
