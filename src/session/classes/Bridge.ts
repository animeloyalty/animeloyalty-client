import * as app from '..';

export class Bridge {
  private readonly _handlers: Array<app.IBridgeHandler>;

  constructor() {
    this._handlers = [];
  }

  dispatchEvent(event: app.VideoEvent) {
    this._handlers.forEach(x => x.onVideoEvent?.call(x, event));
  }

  dispatchRequest(request: app.VideoRequest) {
    this._handlers.forEach(x => x.onVideoRequest?.call(x, request));
  }

  subscribe(handler: app.IBridgeHandler) {
    this._handlers.push(handler);
  }
}
