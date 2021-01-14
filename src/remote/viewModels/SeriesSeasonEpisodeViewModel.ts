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
  openAsync() {
    throw new Error('TODO');
  }

  @mobx.computed
  get displayName() {
    if (this.title) {
      return `Episode ${this.number} - ${this.title}`;
    } else {
      return `Episode ${this.number}`;
    }
  }
  
  @mobx.observable
  imageUrl: string;

  @mobx.observable
  isPremium: boolean;

  @mobx.observable
  number: string;

  @mobx.observable
  synopsis?: string;

  @mobx.observable
  title?: string;

  @mobx.observable
  url: string;
}
