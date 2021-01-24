import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class MainViewModel implements awe.shared.IInputHandler, awm.IBridgeHandler {
  private hideTimeout?: NodeJS.Timeout;

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
    this.clearSchedule();
  }

  @mobx.action
  onInputKey(event: awe.shared.InputKeyEvent) {
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
  onVideoEvent(event: awm.VideoEvent) {
    switch (event.type) {
      case 'ended':
        this.onEnd();
        break;
      case 'error':
        throw new Error('TODO');
      case 'pause':
        this.clearSchedule();
        break;
      case 'playing':
        this.isWaiting = false;
        this.schedule();
        break;
      case 'seeked':
        this.isWaiting = false;
        break;
      case 'seeking':
        this.isWaiting = true;
        this.clearSchedule();
        break;
      case 'waiting':
        this.clearSchedule();
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
  private onEnd() {
    if (this.navigator.hasNext) {
      this.navigator.openNext();
    } else {
      this.leave();
    }
  }
  
  @mobx.action
  private clearHide() {
    if (!this.isHidden) return;
    document.exitPointerLock();
    this.isHidden = false;
  }
  
  @mobx.action
  private clearSchedule() {
    if (!this.hideTimeout) return;
    clearTimeout(this.hideTimeout);
  }

  @mobx.action
  private schedule() {
    this.clearHide();
    this.clearSchedule();
    this.hideTimeout = setTimeout(() => {
      document.body.requestPointerLock();
      this.isHidden = true;
    }, awe.shared.settings.hideTimeout);
  }
}
