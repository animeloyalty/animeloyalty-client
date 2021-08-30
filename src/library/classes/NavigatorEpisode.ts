import * as app from '..';
import {session} from '../..';

export class NavigatorEpisode implements session.INavigatorEpisode {
  constructor(series: app.api.LibrarySeries, season: app.api.LibrarySeriesSeason, episode: app.api.LibrarySeriesSeasonEpisode) {
    this.episodeId = episode.id;
    this.episodeName = episode.episode.toString();
    this.episodeTitle = episode.title;
    this.seasonName = season.title;
    this.seriesName = series.title;
  }

  readonly episodeId: string;
  readonly episodeName: string;
  readonly episodeTitle?: string;
  readonly seasonName: string;
  readonly seriesName: string;
}
