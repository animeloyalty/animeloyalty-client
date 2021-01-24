import * as awm from '..';

export class InputManager {
  private readonly _handlers: Array<awm.IInputHandler>;

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
  
  subscribe(handler: awm.IInputHandler) {
    this._handlers.push(handler);
  }

  unsubscribe(handler: awm.IInputHandler) {
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
      case 'Backspace':
      case 'Escape':
        this._sendKeyEvent(event, {type: 'escape'});
        break;
      case 'Enter':
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

  private _sendKeyEvent(source: KeyboardEvent, event: awm.InputKeyEvent) {
    const handlers = this._handlers.slice().reverse();
    if (!handlers.reduce((p, c) => c.onInputKey?.call(c, event, p) || p, false)) return;
    source.preventDefault();
  }
  
  private _sendMouseEvent(source: MouseEvent, event: awm.InputMouseEvent) {
    const handlers = this._handlers.slice().reverse();
    if (!handlers.reduce((p, c) => c.onInputMouse?.call(c, event, p) || p, false)) return;
    source.preventDefault();
  }
}
