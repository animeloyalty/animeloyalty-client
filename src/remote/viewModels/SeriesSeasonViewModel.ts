import * as app from '..';
import * as mobx from 'mobx';

export class SeriesSeasonViewModel {
  constructor(season: app.RemoteSeriesSeason) {
    this.episodes = season.episodes.map((episode) => new app.SeriesSeasonEpisodeViewModel(episode));
    this.title = season.title;
  }

  @mobx.observable
  episodes: Array<app.SeriesSeasonEpisodeViewModel>;
  
  @mobx.observable
  title: app.RemoteSeriesSeason['title'];
}
