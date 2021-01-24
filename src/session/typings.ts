import * as ace from 'animesync';

export interface IBridgeHandler {
  onVideoEvent?(event: VideoEvent): void;
  onVideoRequest?(event: VideoRequest): void;
}

export interface INavigator {
  readonly current: INavigatorEpisode;
  readonly episodes: Array<INavigatorEpisode>;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  openNext: () => void;
  openPrevious: () => void;
  preloadNext: () => void;
}

export interface INavigatorEpisode {
  seriesName: string;
  seasonName: string;
  episodeName: string;
  episodeTitle?: string;
}

export interface ISubtitle extends ace.api.RemoteStreamSubtitle {
  displayName: string;
}

export type VideoEvent =
  {type: 'ended'} |
  {type: 'error'} |
  {type: 'loadedmetadata'} & {duration: number} |
  {type: 'play'} |
  {type: 'playing'} |
  {type: 'pause'} |
  {type: 'ready'} |
  {type: 'seeked'} & {time: number} |
  {type: 'seeking'} & {time: number} |
  {type: 'timeupdate'} & {buffer: number, duration: number, time: number} |
  {type: 'waiting'} & {time: number};
  
export type VideoRequest =
  {type: 'clearSubtitle'} |
  {type: 'loadStream', videoType: 'application/x-mpegURL', url: string} |
  {type: 'loadSubtitle', subtitle: ISubtitle} |
  {type: 'pause'} |
  {type: 'play'} |
  {type: 'seek', time: number} |
  {type: 'subtitles', subtitles: Array<ISubtitle>};
