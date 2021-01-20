export type PlayState = {
  buffer: number,
  duration: number,
  time: number}
export type VideoEvent =
  {type: 'ended'} |
  {type: 'error'} |
  {type: 'loadedmetadata'} & PlayState |
  {type: 'loadeddata'} & PlayState |
  {type: 'play'} |
  {type: 'playing'} |
  {type: 'pause'} |
  {type: 'ready'} |
  {type: 'seeked'} & PlayState |
  {type: 'timeupdate'} & PlayState |
  {type: 'waiting'} & PlayState;
export type VideoRequest =
  {type: 'pause'} |
  {type: 'play'} |
  {type: 'seek', time: number} |
  {type: 'stream', videoType: 'application/x-mpegURL', url: string} |
  {type: 'subtitle', subtitleType: 'ass' | 'vtt', url: string};
