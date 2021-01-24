import * as app from '..';
import * as mobx from 'mobx';

export class MainViewModel implements app.IBridgeHandler, app.IInputHandler {
  private didPreload?: boolean;
  private hideTimeout?: NodeJS.Timeout;

  constructor(
    private readonly bridge: app.Bridge,
    private readonly navigator: app.INavigator
  ) {}

  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    this.control.attach();
    return this;
  }

  @mobx.action
  leave() {
    app.core.view.leave();
    this.removeSchedule();
  }

  @mobx.action
  onInputKey(event: app.InputKeyEvent) {
    if (event.type !== 'escape') {
      this.schedule();
      return false;
    } else if (this.isHidden) {
      this.schedule();
      return true;
    } else {
      this.leave();
      return true;
    }
  }

  @mobx.action
  onInputMouse() {
    this.schedule();
    return false;
  }

  @mobx.action
  onVideoEvent(event: app.VideoEvent) {
    switch (event.type) {
      case 'ended':
        this.onEnd();
        break;
      case 'error':
        throw new Error('TODO');
      case 'playing':
        this.isWaiting = false;
        this.schedule();
        break;
      case 'seeked':
        this.isWaiting = false;
        break;
      case 'seeking':
        this.isWaiting = true;
        break;
      case 'timeupdate':
        this.onTimeUpdate(event.time, event.duration);
        break;
      case 'waiting':
        this.isWaiting = true;
        break;
    }
  }

  @mobx.action
  togglePlay() {
    this.control.togglePlay();
  }

  @mobx.observable
  isHidden = false;

  @mobx.observable
  isWaiting = true;

  @mobx.observable
  readonly control = new app.MainControlViewModel(this.bridge, this.navigator);

  @mobx.observable
  readonly title = new app.MainTitleViewModel(this.navigator, this.leave.bind(this));

  @mobx.action
  private onEnd() {
    if (this.navigator.hasNext) {
      this.navigator.openNext();
    } else {
      this.leave();
    }
  }
  
  @mobx.action
  private onTimeUpdate(time: number, duration: number) {
    if (this.didPreload || duration - time > app.settings.preloadTreshold) return;
    this.didPreload = true;
    this.navigator.preloadNext();
  }

  @mobx.action
  private removeHide() {
    if (!this.isHidden) return;
    document.exitPointerLock();
    this.isHidden = false;
  }
  
  @mobx.action
  private removeSchedule() {
    if (!this.hideTimeout) return;
    clearTimeout(this.hideTimeout);
  }

  @mobx.action
  private schedule() {
    this.removeHide();
    this.removeSchedule();
    this.hideTimeout = setTimeout(() => {
      if (!this.control.isPlaying || this.isWaiting) return;
      document.body.requestPointerLock();
      this.isHidden = true;
    }, app.settings.hideTimeout);
  }
}
