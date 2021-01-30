import * as app from '..';
import videojs from 'video.js';

export class Dispatcher {
  private constructor(
    private readonly bridge: app.Bridge,
    private readonly player: videojs.Player
  ) {}

  static attach(bridge: app.Bridge, player: videojs.Player) {
    const dispatcher = new Dispatcher(bridge, player);
    dispatcher.attach();
  }

  attach() {
    this.player.on('ended', () => this.bridge.dispatchEvent({type: 'ended'}));
    this.player.on('error', () => this.bridge.dispatchEvent(time('error', this.player)));
    this.player.on('loadedmetadata', () => this.bridge.dispatchEvent(time('loadedmetadata', this.player)));
    this.player.on('playing', () => this.bridge.dispatchEvent(time('playing', this.player)));
    this.player.on('seeked', () => this.bridge.dispatchEvent(time('seeked', this.player)));
    this.player.on('seeking', () => this.bridge.dispatchEvent(time('seeking', this.player)));
    this.player.on('timeupdate', () => this.bridge.dispatchEvent(time('timeupdate', this.player)));
    this.player.on('waiting', () => this.bridge.dispatchEvent(time('waiting', this.player)));
    return this;
  }
}

function time<T>(type: T, player: videojs.Player) {
  const buffer = Math.floor(player.buffered().end(0));
  const duration = Math.ceil(player.duration());
  const time = Math.floor(player.currentTime());
  return {type, buffer, duration, time};
}
