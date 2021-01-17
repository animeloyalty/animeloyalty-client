import * as app from '..';
import * as ace from 'animesync';
import * as mobx from 'mobx';

export class SeriesSeasonViewModel {
  constructor(season: ace.api.RemoteSeriesSeason) {
    this.episodes = season.episodes.map((episode) => new app.SeriesSeasonEpisodeViewModel(episode));
    this.title = season.title;
  }

  @mobx.observable
  episodes: Array<app.SeriesSeasonEpisodeViewModel>;
  
  @mobx.observable
  title: ace.api.RemoteSeriesSeason['title'];
}
