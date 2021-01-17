import * as app from '..';
import * as ace from 'animesync';
import * as mobx from 'mobx';

export class SeriesSeasonEpisodeViewModel {
  constructor(episode: ace.api.RemoteSeriesSeasonEpisode) {
    this.imageUrl = episode.imageUrl;
    this.isPremium = episode.isPremium;
    this.name = episode.name;
    this.synopsis = episode.synopsis;
    this.title = episode.title;
    this.url = episode.url;
  }

  @mobx.action
  async openAsync() {
    await app.core.screen.openChildAsync(app.StreamController.createConstruct(this.url));
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
