import * as ace from 'animesync';
import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class SeriesSeasonEpisodeViewModel {
  constructor(private series: ace.api.RemoteSeries, private seasonIndex: number, private episodeIndex: number) {
    const episode = series.seasons[seasonIndex].episodes[episodeIndex];
    this.imageUrl = episode.imageUrl;
    this.isPremium = episode.isPremium;
    this.name = episode.name;
    this.synopsis = episode.synopsis;
    this.title = episode.title;
    this.url = episode.url;
  }

  @mobx.action
  open() {
    const navigator = awm.Navigator.create(this.series, this.seasonIndex, this.episodeIndex);
    const controller = awm.StreamController.createController(navigator, this.url);
    awe.shared.core.screen.open(controller);
  }

  @mobx.computed
  get displayName() {
    const name = isFinite(parseFloat(this.name))
      ? this.name.padStart(2, '0')
      : this.name;
    return this.title
      ? `${name} - ${this.title}`
      : `${name}`;
  }
  
  @mobx.observable
  imageUrl: ace.api.RemoteSeriesSeasonEpisode['imageUrl'];

  @mobx.observable
  isPremium: ace.api.RemoteSeriesSeasonEpisode['isPremium'];

  @mobx.observable
  name: ace.api.RemoteSeriesSeasonEpisode['name'];

  @mobx.observable
  synopsis: ace.api.RemoteSeriesSeasonEpisode['synopsis'];

  @mobx.observable
  title: ace.api.RemoteSeriesSeasonEpisode['title'];

  @mobx.observable
  url: ace.api.RemoteSeriesSeasonEpisode['url'];
}
