import * as app from '..';
import * as mobx from 'mobx';

export class MainControlViewModel implements app.IBridgeHandler, app.IInputHandler {
  private seekTimeout?: NodeJS.Timeout;

  constructor(
    private readonly bridge: app.Bridge,
    private readonly navigator: app.INavigator
  ) {}

  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    this.subtitle.attach();
    return this;
  }

  @mobx.action
  onInputKey(event: app.InputKeyEvent) {
    if (event.type === 'enter') {
      this.togglePlay();
      return true;
    } else if (event.type === 'arrowLeft') {
      this.seekBackward();
      return true;
    } else if (event.type === 'arrowRight') {
      this.seekForward();
      return true;
    } else {
      return false;
    }
  }
  
  @mobx.action
  onVideoEvent(event: app.VideoEvent) {
    switch (event.type) {
      case 'destroy':
        this.removeSchedule();
        break;
      case 'loadedmetadata':
        this.currentDuration = event.duration;
        break;
      case 'seeked':
        this.isSeeking = false;
        break;
      case 'timeupdate':
        this.currentBuffer = event.buffer;
        this.currentDuration = event.duration;
        if (!this.isSeeking) this.currentTime = event.time;
        break;
      case 'waiting':
        if (!this.isSeeking) this.currentTime = event.time;
        break;
    }
  }
  
  @mobx.action
  openNext() {
    if (!this.hasNext) return;
    this.navigator.openNext();
  }
  
  @mobx.action
  openPrevious() {
    if (!this.hasPrevious) return;
    this.navigator.openPrevious();
  }

  @mobx.action
  seekForward() {
    if (!this.isLoaded) return;
    this.currentTime = Math.min(this.currentTime + app.settings.seekForward, this.currentDuration);
    this.isSeeking = true;
    this.schedule();
  }

  @mobx.action
  seekBackward() {
    if (!this.isLoaded) return;
    this.currentTime = Math.max(this.currentTime - app.settings.seekBackward, 0);
    this.isSeeking = true;
    this.schedule();
  }

  @mobx.action
  seekStart(time: number) {
    if (!this.isLoaded) return;
    this.currentTime = time;
    this.isSeeking = true;
  }

  @mobx.action
  seekStop(time: number) {
    if (!this.isLoaded) return;
    this.currentTime = time;
    this.isSeeking = true;
    this.bridge.dispatchRequest({type: 'seek', time});
  }

  @mobx.action
  togglePlay() {
    if (!this.isLoaded) return;
    this.isPlaying = !this.isPlaying;
    this.bridge.dispatchRequest(this.isPlaying ? {type: 'play'} : {type: 'pause'});
  }

  @mobx.computed
  get isLoaded() {
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
  
  @mobx.computed
  get titlePrimary() {
    const current = this.navigator.current;
    const name = isFinite(parseFloat(current.episodeName))
      ? current.episodeName.padStart(2, '0')
      : current.episodeName;
    return current.episodeTitle
      ? `Episode ${name} - ${current.episodeTitle}`
      : `Episode ${name}`;
  }

  @mobx.computed
  get titleSecondary() {
    return this.navigator.current.seriesName === this.navigator.current.seasonName
      ? `${this.navigator.current.seriesName}`
      : `${this.navigator.current.seriesName} ● ${this.navigator.current.seasonName}`;
  }
  
  @mobx.observable
  currentBuffer = 0;

  @mobx.observable
  currentDuration = 0;

  @mobx.observable
  currentTime = 0;

  @mobx.observable
  isPlaying = true;

  @mobx.observable
  isSeeking = false;

  @mobx.observable
  readonly subtitle = new app.MainControlSubtitleViewModel(this.bridge);

  @mobx.action
  private removeSchedule() {
    if (!this.seekTimeout) return;
    clearTimeout(this.seekTimeout);
  }

  @mobx.action
  private schedule() {
    this.removeSchedule();
    this.seekTimeout = setTimeout(() => this.bridge.dispatchRequest({type: 'seek', time: this.currentTime}), app.settings.seekTimeout);
  }
}
