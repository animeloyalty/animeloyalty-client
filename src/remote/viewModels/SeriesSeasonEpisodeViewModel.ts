import * as app from '..';
import * as mobx from 'mobx';

export class SeriesSeasonEpisodeViewModel {
  constructor(private series: app.api.RemoteSeries, private seasonIndex: number, private episodeIndex: number) {
    const episode = series.seasons[seasonIndex].episodes[episodeIndex];
    this.imageUrl = episode.imageUrl;
    this.name = episode.name;
    this.title = episode.title;
    this.url = episode.url;
  }

  @mobx.action
  open() {
    const navigator = app.Navigator.create(this.series, this.seasonIndex, this.episodeIndex);
    const controller = app.StreamController.createController(navigator, this.url);
    app.core.view.open(controller);
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
  readonly imageUrl: app.api.RemoteSeriesSeasonEpisode['imageUrl'];

  @mobx.observable
  readonly name: app.api.RemoteSeriesSeasonEpisode['name'];

  @mobx.observable
  readonly title: app.api.RemoteSeriesSeasonEpisode['title'];

  @mobx.observable
  readonly url: app.api.RemoteSeriesSeasonEpisode['url'];
}
