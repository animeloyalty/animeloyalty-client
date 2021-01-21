export interface INavigator {
  readonly current: INavigatorEpisode;
  readonly episodes: Array<INavigatorEpisode>;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  openNext: () => void;
  openPrevious: () => void;
}

export interface INavigatorEpisode {
  seriesName: string;
  seasonName: string;
  episodeName: string;
  episodeTitle?: string;
}

export type VideoEvent =
  {type: 'ended'} |
  {type: 'error'} |
  {type: 'loadedmetadata'} & {duration: number} |
  {type: 'loadeddata'} |
  {type: 'play'} |
  {type: 'playing'} |
  {type: 'pause'} |
  {type: 'ready'} |
  {type: 'seeked'} |
  {type: 'timeupdate'} & {buffer: number, duration: number, time: number} |
  {type: 'waiting'} & {time: number};
  
export type VideoRequest =
  {type: 'pause'} |
  {type: 'play'} |
  {type: 'seek', time: number} |
  {type: 'stream', videoType: 'application/x-mpegURL', url: string} |
  {type: 'subtitle', subtitleType: 'ass' | 'vtt', url: string};
