import * as app from '..';
import * as mobx from 'mobx';

export class SeriesSeasonEpisodeViewModel {
  constructor(episode: app.RemoteSeriesSeasonEpisode) {
    this.imageUrl = episode.imageUrl;
    this.isPremium = episode.isPremium;
    this.number = episode.number;
    this.synopsis = episode.synopsis;
    this.title = episode.title;
    this.url = episode.url;
  }

  @mobx.action
  async openAsync() {
    await app.core.screen.openChildAsync(app.StreamController.createConstruct(this.displayName, this.url));
  }

  @mobx.computed
  get displayName() {
    if (this.title) {
      return `${this.number} - ${this.title}`;
    } else {
      return `${this.number}`;
    }
  }
  
  @mobx.observable
  imageUrl: app.RemoteSeriesSeasonEpisode['imageUrl'];

  @mobx.observable
  isPremium: app.RemoteSeriesSeasonEpisode['isPremium'];

  @mobx.observable
  number: app.RemoteSeriesSeasonEpisode['number'];

  @mobx.observable
  synopsis: app.RemoteSeriesSeasonEpisode['synopsis'];

  @mobx.observable
  title: app.RemoteSeriesSeasonEpisode['title'];

  @mobx.observable
  url: app.RemoteSeriesSeasonEpisode['url'];
}
