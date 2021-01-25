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
    this._handlers.push(handler);
  }

  unsubscribe(handler: app.IInputHandler) {
    const index = this._handlers.indexOf(handler);
    if (index !== -1) this._handlers.splice(index, 1);
  }

  private _onKeyEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
        this._sendKeyEvent(event, {type: 'arrowLeft'});
        break;
      case 'ArrowRight':
        this._sendKeyEvent(event, {type: 'arrowRight'});
        break;
      case 'Backslash':
        this._sendKeyEvent(event, {type: 'fullscreen'});
        break;
      case 'Backspace':
        this._sendKeyEvent(event, {type: 'escape'});
        break;
      case 'Escape':
        this._sendKeyEvent(event, {type: 'escape'});
        break;
      case 'Enter':
        this._sendKeyEvent(event, event.altKey ? {type: 'fullscreen'} : {type: 'enter'});
        break;
      case 'F11':
        this._sendKeyEvent(event, {type: 'fullscreen'});
        break;
      case 'KeyF':
        this._sendKeyEvent(event, {type: 'fullscreen'});
        break;
      case 'Space':
        this._sendKeyEvent(event, {type: 'enter'});
        break;
    }
  }

  private _onMouseEvent(event: MouseEvent) {
    switch (event.type) {
      case 'mousedown':
        this._sendMouseEvent(event, {type: 'down'});
        break;
      case 'mousemove':
        this._sendMouseEvent(event, {type: 'move'});
        break;
      case 'mouseup':
        this._sendMouseEvent(event, {type: 'up'});
        break;
    }
  }

  private _sendKeyEvent(source: KeyboardEvent, event: app.InputKeyEvent) {
    if (!this._handlers.slice().reverse().reduce((p, c) => c.onInputKey?.call(c, event, p) || p, false)) return;
    source.preventDefault();
  }
  
  private _sendMouseEvent(source: MouseEvent, event: app.InputMouseEvent) {
    if (!this._handlers.slice().reverse().reduce((p, c) => c.onInputMouse?.call(c, event, p) || p, false)) return;
    source.preventDefault();
  }
}
