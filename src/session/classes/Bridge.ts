import * as awm from '..';

export class Bridge {
  private readonly _eventHandlers: Array<(event: awm.VideoEvent) => void>;
  private readonly _requestHandlers: Array<(event: awm.VideoRequest) => void>;

  constructor() {
    this._eventHandlers = [];
    this._requestHandlers = [];
  }

  addEventHandler(handler: (event: awm.VideoEvent) => void) {
    this._eventHandlers.push(handler);
  }

  addRequestHandler(handler: (event: awm.VideoRequest) => void) {
    this._requestHandlers.push(handler);
  }

  dispatchEvent(event: awm.VideoEvent) {
    this._eventHandlers.forEach(handler => handler(event));
  }

  dispatchRequest(request: awm.VideoRequest) {
    this._requestHandlers.forEach(handler => handler(request));
  }
}
