import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class MainViewModel implements awe.shared.IInputHandler, awm.IBridgeHandler {
  private hideTimeout?: NodeJS.Timeout;
  private isLoaded?: boolean;

  constructor(
    private readonly bridge: awm.Bridge,
    private readonly navigator: awm.INavigator
  ) {}

  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    this.control.attach();
    return this;
  }

  @mobx.action
  leave() {
    awe.shared.core.screen.leave();
    this.removeHide();
  }

  @mobx.action
  onInputKey(event: awe.shared.InputKeyEvent) {
    if (event.type !== 'escape') {
      return false;
    } else if (this.isHidden) {
      this.removeHide();
      this.scheduleHide();
      return true;
    } else {
      this.leave();
      return true;
    }
  }

  @mobx.action
  onInputMouse(event: awe.shared.InputMouseEvent) {
    if (this.isHidden && (event.type === 'down' || event.type === 'up')) {
      this.togglePlay();
      return true;
    } else if (this.isLoaded && this.control.isPlaying && !this.isWaiting) {
      this.removeHide();
      this.scheduleHide();
      return false;
    } else {
      return false;
    }
  }

  @mobx.action
  onVideoEvent(event: awm.VideoEvent) {
    switch (event.type) {
      case 'ended':
        this.end();
        break;
      case 'error':
        throw new Error('TODO');
      case 'pause':
        this.removeHide();
        break;
      case 'playing':
        this.isLoaded = true;
        this.isWaiting = false;
        this.scheduleHide();
        break;
      case 'seeking':
        this.removeHide();
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
  readonly control = new awm.MainControlViewModel(this.bridge, this.navigator);

  @mobx.observable
  readonly title = new awm.MainTitleViewModel(this.navigator, this.leave.bind(this));

  @mobx.action
  private end() {
    if (this.navigator.hasNext) {
      this.navigator.openNext();
    } else {
      this.leave();
    }
  }
  
  @mobx.action
  private removeHide() {
    if (this.isHidden) {
      document.exitPointerLock();
      this.isHidden = false;
    } else if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      delete this.hideTimeout;
    }
  }

  @mobx.action
  private scheduleHide() {
    if (this.isHidden) return;
    this.hideTimeout ??= setTimeout(() => {
      document.body.requestPointerLock();
      this.isHidden = true;
    }, awe.shared.settings.hideTimeout);
  }
}
