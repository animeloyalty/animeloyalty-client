import * as awm from '..';
import videojs from 'video.js';

export class Dispatcher {
  private constructor(
    private readonly bridge: awm.Bridge,
    private readonly player: videojs.Player
  ) {}

  static attach(bridge: awm.Bridge, player: videojs.Player) {
    const distributor = new Dispatcher(bridge, player);
    distributor.attach();
  }

  attach() {
    this.player.on('ended', () => this.bridge.dispatchEvent({type: 'ended'}));
    this.player.on('error', () => this.bridge.dispatchEvent({type: 'error'}));
    this.player.on('loadedmetadata', () => this.bridge.dispatchEvent(time('loadedmetadata', this.player)));
    this.player.on('play', () => this.bridge.dispatchEvent({type: 'play'}));
    this.player.on('playing', () => this.bridge.dispatchEvent({type: 'playing'}));
    this.player.on('pause', () => this.bridge.dispatchEvent({type: 'pause'}));
    this.player.on('seeking', () => this.bridge.dispatchEvent({type: 'seeking'}));
    this.player.on('timeupdate', () => this.bridge.dispatchEvent(time('timeupdate', this.player)));
    this.player.on('waiting', () => this.bridge.dispatchEvent(time('waiting', this.player)));
    return this;
  }
}

function time<T>(type: T, player: videojs.Player) {
  const buffer = Math.floor(player.buffered().end(0));
  const duration = Math.floor(player.duration());
  const time = Math.floor(player.currentTime());
  return {type, buffer, duration, time};
}
