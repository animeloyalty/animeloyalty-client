import * as ace from 'animesync';
import * as app from '..';
import * as mobx from 'mobx';

export class SeriesSeasonViewModel {
  constructor(series: ace.api.RemoteSeries, seasonIndex: number) {
    const season = series.seasons[seasonIndex];
    this.episodes = season.episodes.map((_, episodeIndex) => new app.SeriesSeasonEpisodeViewModel(series, seasonIndex, episodeIndex));
    this.title = season.title;
  }

  @mobx.computed
  get hasEpisodes() {
    return Boolean(this.episodes.length);
  }

  @mobx.observable
  episodes: Array<app.SeriesSeasonEpisodeViewModel>;
  
  @mobx.observable
  title: ace.api.RemoteSeriesSeason['title'];
}
