import * as app from '..';

export class Bridge {
  private readonly handlers: Array<app.IBridgeHandler>;

  constructor() {
    this.handlers = [];
  }

  dispatchEvent(event: app.VideoEvent) {
    this.handlers.forEach(x => x.onVideoEvent?.call(x, event));
  }

  dispatchRequest(request: app.VideoRequest) {
    this.handlers.forEach(x => x.onVideoRequest?.call(x, request));
  }

  subscribe(handler: app.IBridgeHandler) {
    this.handlers.push(handler);
  }
}
