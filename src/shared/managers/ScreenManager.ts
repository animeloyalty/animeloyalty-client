import * as awm from '..';
import * as mobx from 'mobx';
const fullscreenKey = 'fullscreen';
const fullscreenOff = 'false';
const fullscreenOn = 'true';

export class ScreenManager implements awm.IInputHandler {
  @mobx.action
  attach() {
    awm.core.input.subscribe(this);
    return this;
  }

  @mobx.action
  checkStartup() {
    if (localStorage.getItem(fullscreenKey) !== fullscreenOn) return;
    this.toggleFullscreen();
  }
  
  @mobx.action
  onInputKey(event: awm.InputKeyEvent) {
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
      await document.body.requestFullscreen();
      this.isFullscreen = true;
      localStorage.setItem(fullscreenKey, fullscreenOn);
    } catch {
      this.isFullscreen = false;
      localStorage.setItem(fullscreenKey, fullscreenOff);
    }
  }

  private async exitAsync() {
    try {
      await document.exitFullscreen();
      this.isFullscreen = false;
      localStorage.setItem(fullscreenKey, fullscreenOff);
    } catch {
      this.isFullscreen = false;
      localStorage.setItem(fullscreenKey, fullscreenOff);
    }
  }
}
