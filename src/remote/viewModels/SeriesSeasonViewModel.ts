import * as ace from 'animesync';
import * as awm from '..';
import * as mobx from 'mobx';

export class SeriesSeasonViewModel {
  constructor(series: ace.api.RemoteSeries, seasonIndex: number) {
    const season = series.seasons[seasonIndex];
    this.episodes = season.episodes.map((_, episodeIndex) => new awm.SeriesSeasonEpisodeViewModel(series, seasonIndex, episodeIndex));
    this.title = season.title;
  }

  @mobx.observable
  episodes: Array<awm.SeriesSeasonEpisodeViewModel>;
  
  @mobx.observable
  title: ace.api.RemoteSeriesSeason['title'];
}
