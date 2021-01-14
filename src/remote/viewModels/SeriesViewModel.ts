import * as app from '..';
import * as mobx from 'mobx';

export class SeriesViewModel {
  constructor(url: string) {
    this.genres = [];
    this.imageUrl = '';
    this.seasons = [];
    this.title = '';
    this.url = url;
  }

  @mobx.action
  async refreshAsync() {
    await app.core.screen.loadAsync(async () => {
      const result = await app.core.api.remote.seriesAsync(this);
      if (result.value) {
        this.genres = result.value.genres;
        this.imageUrl = result.value.imageUrl;
        this.seasons = result.value.seasons.map((season) => new app.SeriesSeasonViewModel(season));
        this.synopsis = result.value.synopsis;
        this.title = result.value.title;
        this.url = result.value.url;
      } else {
        throw new Error('TODO');
      }
    });
  }

  @mobx.observable
  genres: string[];
  
  @mobx.observable
  imageUrl: string;

  @mobx.observable
  seasons: Array<app.SeriesSeasonViewModel>;

  @mobx.observable
  synopsis?: string;

  @mobx.observable
  title: string;

  @mobx.observable
  url: string;
}
