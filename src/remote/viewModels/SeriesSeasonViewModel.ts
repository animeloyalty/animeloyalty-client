import * as app from '..';
import * as mobx from 'mobx';

export class SeriesSeasonViewModel {
  constructor(series: app.api.RemoteSeries, seasonIndex: number) {
    const season = series.seasons[seasonIndex];
    this.episodes = season.episodes.map((_, episodeIndex) => new app.SeriesSeasonEpisodeViewModel(series, seasonIndex, episodeIndex));
    this.title = season.title;
  }

  @mobx.computed
  get hasEpisodes() {
    return Boolean(this.episodes.length);
  }

  @mobx.observable
  readonly episodes: Array<app.SeriesSeasonEpisodeViewModel>;
  
  @mobx.observable
  readonly title: app.api.RemoteSeriesSeason['title'];
}
