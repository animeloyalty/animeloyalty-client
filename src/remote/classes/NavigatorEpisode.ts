import * as app from '..';
import {session} from '../..';

export class NavigatorEpisode implements session.INavigatorEpisode {
  constructor(series: app.api.RemoteSeries, season: app.api.RemoteSeriesSeason, episode: app.api.RemoteSeriesSeasonEpisode) {
    this.episodeName = episode.name;
    this.episodeTitle = episode.title;
    this.episodeUrl = episode.url;
    this.seasonName = season.title;
    this.seriesName = series.title;
  }

  readonly episodeName: string;
  readonly episodeTitle?: string;
  readonly episodeUrl: string;
  readonly seasonName: string;
  readonly seriesName: string;
}
