export interface IInputHandler {
  onInputKey?(event: InputKeyEvent, handled: boolean): boolean;
  onInputMouse?(event: InputMouseEvent, handled: boolean): boolean;
}

export type InputKeyEvent = 
  {type: 'arrowLeft'} |
  {type: 'arrowRight'} |
  {type: 'enter'} | 
  {type: 'escape'};

export type InputMouseEvent =
  {type: 'up'} |
  {type: 'down'} |
  {type: 'move'};
