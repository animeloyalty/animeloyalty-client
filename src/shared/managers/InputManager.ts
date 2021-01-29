import * as app from '..';

export class InputManager {
  private readonly _handlers: Array<app.IInputHandler>;

  constructor() {
    this._handlers = [];
  }

  attach() {
    document.addEventListener('keydown', this._onKeyEvent.bind(this));
    document.addEventListener('mousedown', this._onMouseEvent.bind(this));
    document.addEventListener('mousemove',this._onMouseEvent.bind(this));
    document.addEventListener('mouseup', this._onMouseEvent.bind(this));
    return this;
  }
  
  subscribe(handler: app.IInputHandler) {
    const index = this._handlers.indexOf(handler);
    if (index === -1) this._handlers.push(handler);
  }

  unsubscribe(handler: app.IInputHandler) {
    const index = this._handlers.indexOf(handler);
    if (index !== -1) this._handlers.splice(index, 1);
  }

  private _dispatchKeyEvent(source: KeyboardEvent, event: app.InputKeyEvent) {
    if (!this._handlers.slice().reverse().reduce((p, c) => c.onInputKey?.call(c, event, p) || p, false)) return;
    source.preventDefault();
  }
  
  private _dispatchMouseEvent(source: MouseEvent, event: app.InputMouseEvent) {
    if (!this._handlers.slice().reverse().reduce((p, c) => c.onInputMouse?.call(c, event, p) || p, false)) return;
    source.preventDefault();
  }

  private _onKeyEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
        this._dispatchKeyEvent(event, {type: 'arrowLeft'});
        break;
      case 'ArrowRight':
        this._dispatchKeyEvent(event, {type: 'arrowRight'});
        break;
      case 'Backslash':
        this._dispatchKeyEvent(event, {type: 'fullscreen'});
        break;
      case 'Backspace':
        this._dispatchKeyEvent(event, {type: 'escape'});
        break;
      case 'Escape':
        this._dispatchKeyEvent(event, {type: 'escape'});
        break;
      case 'Enter':
        this._dispatchKeyEvent(event, event.altKey ? {type: 'fullscreen'} : {type: 'enter'});
        break;
      case 'F11':
        this._dispatchKeyEvent(event, {type: 'fullscreen'});
        break;
      case 'KeyF':
        this._dispatchKeyEvent(event, {type: 'fullscreen'});
        break;
      case 'Space':
        this._dispatchKeyEvent(event, {type: 'enter'});
        break;
    }
  }

  private _onMouseEvent(event: MouseEvent) {
    switch (event.type) {
      case 'mousedown':
        this._dispatchMouseEvent(event, {type: 'down'});
        break;
      case 'mousemove':
        this._dispatchMouseEvent(event, {type: 'move'});
        break;
      case 'mouseup':
        this._dispatchMouseEvent(event, {type: 'up'});
        break;
    }
  }
}
