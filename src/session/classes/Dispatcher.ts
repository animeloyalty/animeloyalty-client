import * as app from '..';
import Hls from 'hls.js';

export class Dispatcher {
  private constructor(
    private readonly bridge: app.Bridge,
    private readonly hls: Hls,
    private readonly player: HTMLVideoElement
  ) {}

  static attach(bridge: app.Bridge, hls: Hls, player: HTMLVideoElement) {
    const dispatcher = new Dispatcher(bridge, hls, player);
    dispatcher.attach();
  }

  attach() {
    this.hls.on('hlsError', (_, data) => this.onHlsError(data));
    this.player.addEventListener('ended', () => this.bridge.dispatchEvent({type: 'ended'}));
    this.player.addEventListener('error', () => this.bridge.dispatchEvent(fetch('error', this.player)));
    this.player.addEventListener('loadedmetadata', () => this.bridge.dispatchEvent(fetch('loadedmetadata', this.player)));
    this.player.addEventListener('playing', () => this.bridge.dispatchEvent(fetch('playing', this.player)));
    this.player.addEventListener('progress', () => this.bridge.dispatchEvent(fetch('progress', this.player)));
    this.player.addEventListener('pause', () => this.bridge.dispatchEvent(fetch('pause', this.player)));
    this.player.addEventListener('seeked', () => this.bridge.dispatchEvent(fetch('seeked', this.player)));
    this.player.addEventListener('seeking', () => this.bridge.dispatchEvent(fetch('seeking', this.player)));
    this.player.addEventListener('timeupdate', () => this.bridge.dispatchEvent(fetch('timeupdate', this.player)));
    this.player.addEventListener('waiting', () => this.bridge.dispatchEvent(fetch('waiting', this.player)));
    return this;
  }

  private onHlsError(data: Hls.errorData) {
    this.bridge.dispatchEvent(data.fatal
      ? fetch('error', this.player)
      : fetch('warning', this.player));
  }
}

function fetch(type: app.VideoEvent['type'], player: HTMLVideoElement) {
  const buffer = fetchBuffer(player);
  const duration = Math.ceil(player.duration);
  const time = Math.floor(player.currentTime);
  return {type, buffer, duration, time};
}

function fetchBuffer(player: HTMLVideoElement) {
  for (let i = 0; i < player.buffered.length; i++) {
    if (player.currentTime < player.buffered.start(i)) continue;
    if (player.currentTime > player.buffered.end(i)) continue;
    return Math.floor(player.buffered.end(i));
  }
  return 0;
}
