import * as awe from '../..';
import * as awm from '..';
import videojs from 'video.js';

export class Distributor {
  constructor(
    private readonly bridge: awm.Bridge,
    private readonly player: videojs.Player
  ) {}

  attach() {
    this.bridge.addRequestHandler(this._onRequest.bind(this));
    this.player.on('ended', () => this.bridge.dispatchEvent({type: 'ended'}));
    this.player.on('error', () => this.bridge.dispatchEvent({type: 'error'}));
    this.player.on('loadedmetadata', () => this.bridge.dispatchEvent(time('loadedmetadata', this.player)));
    this.player.on('loadeddata', () => this.bridge.dispatchEvent(time('loadeddata', this.player)));
    this.player.on('play', () => this.bridge.dispatchEvent({type: 'play'}));
    this.player.on('playing', () => this.bridge.dispatchEvent({type: 'playing'}));
    this.player.on('pause', () => this.bridge.dispatchEvent({type: 'pause'}));
    this.player.on('timeupdate', () => this.bridge.dispatchEvent(time('timeupdate', this.player)));
    this.player.on('seeked', () => this.bridge.dispatchEvent(time('seeked', this.player)));
    this.player.on('waiting', () => this.bridge.dispatchEvent(time('waiting', this.player)));
    return this;
  }

  private _onRequest(request: awm.VideoRequest) {
    switch (request.type) {
      case 'pause':
        this.player.pause();
        break;
      case 'play':
        this.player.play();
        break;
      case 'seek':
        this.player.currentTime(request.time);
        this.bridge.dispatchEvent(time('waiting', this.player));
        break;
      case 'stream':
        this.player.src({src: request.url, type: request.videoType});
        break;
      case 'subtitle':
        Array.from(this.player.remoteTextTracks()).forEach(x => this.player.removeRemoteTextTrack(awe.shared.unsafe(x)));
        break;
    }
  }
}

function time<T>(type: T, player: videojs.Player) {
  const buffer = player.buffered().end(0);
  const duration = player.duration();
  const time = player.currentTime();
  return {type, buffer, duration, time};
}
