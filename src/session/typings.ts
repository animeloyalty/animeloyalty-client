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
  readonly seriesName: string;
  readonly seasonName: string;
  readonly episodeName: string;
  readonly episodeTitle?: string;
}

export interface ISubtitle {
  readonly displayName?: string;
  readonly language: 'ara' | 'fre' | 'ger' | 'ita' | 'eng' | 'por' | 'rus' | 'spa';
  readonly type: 'ass' | 'vtt';
  readonly url: string;
};

export type VideoEvent =
  {type: 'create'} |
  {type: 'destroy'} |
  {type: 'ended'} |
  {type: 'error'} |
  {type: 'loadedmetadata'} & {duration: number} |
  {type: 'playing'} & {time: number} |
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
