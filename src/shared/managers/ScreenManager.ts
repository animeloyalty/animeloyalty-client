import * as app from '..';
import * as mobx from 'mobx';
const fullscreenKey = 'fullscreen';

export class ScreenManager implements app.IInputHandler {
  @mobx.action
  attach() {
    app.core.input.subscribe(this);
    return this;
  }

  @mobx.action
  onElectronStart() {
    if (!app.core.store.getBoolean(fullscreenKey, false)) return false;
    this.toggleFullscreen();
    return true;
  }
  
  @mobx.action
  onElectronState(fullscreen: boolean) {
    app.core.store.set(fullscreenKey, fullscreen);
    this.isFullscreen = fullscreen;
  }

  @mobx.action
  onInputKey(event: app.InputKeyEvent) {
    if (event.type === 'fullscreen') {
      this.toggleFullscreen();
      return true;
    } else {
      return false;
    }
  }

  @mobx.action
  toggleFullscreen() {
    this.isFullscreen
      ? this.exitAsync()
      : this.enterAsync();
  }
  
  @mobx.observable
  isFullscreen = false;

  private async enterAsync() {
    try {
      await document.documentElement.requestFullscreen();
      app.core.store.set(fullscreenKey, true);
      this.isFullscreen = true;
    } catch {
      app.core.store.set(fullscreenKey, false);
      this.isFullscreen = false;
    }
  }

  private async exitAsync() {
    try {
      await document.exitFullscreen();
      app.core.store.set(fullscreenKey, false);
      this.isFullscreen = false;
    } catch {
      app.core.store.set(fullscreenKey, false);
      this.isFullscreen = false;
    }
  }
}
