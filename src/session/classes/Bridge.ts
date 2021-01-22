import * as awm from '..';

export class Bridge {
  private readonly _handlers: Array<awm.IBridgeHandler>;

  constructor() {
    this._handlers = [];
  }

  dispatchEvent(event: awm.VideoEvent) {
    this._handlers.forEach(x => x.onVideoEvent?.call(x, event));
  }

  dispatchRequest(request: awm.VideoRequest) {
    this._handlers.forEach(x => x.onVideoRequest?.call(x, request));
  }

  subscribe(handler: awm.IBridgeHandler) {
    this._handlers.push(handler);
  }
}
