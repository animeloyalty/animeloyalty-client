import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class MainViewModel {
  constructor(
    private readonly bridge: awm.Bridge,
    private readonly navigator: awm.INavigator
  ) {}

  @mobx.action
  attach() {
    this.bridge.addEventHandler(this._onEvent.bind(this));
    this.control.attach();
    return this;
  }

  @mobx.observable
  isWaiting = true;

  @mobx.observable
  readonly control = new awm.MainControlViewModel(this.bridge, this.navigator);

  @mobx.observable
  readonly title = new awm.MainTitleViewModel(this.navigator);
  
  @mobx.action
  private _onEvent(event: awm.VideoEvent) {
    switch (event.type) {
      case 'ended':
        awe.shared.core.screen.leave();
        break;
      case 'ended':
        awe.shared.core.screen.leave();
        break;
      case 'loadeddata':
        this.isWaiting = false;
        break;
      case 'playing':
        this.isWaiting = false;
        break;
      case 'seeked':
        this.isWaiting = false;
        break;
      case 'waiting':
        this.isWaiting = true;
        break;
    }
  }
}
