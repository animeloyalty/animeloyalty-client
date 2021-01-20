import * as ace from 'animesync';
import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class SeriesViewModel {
  constructor(title: string, url: string) {
    this.genres = [];
    this.imageUrl = '';
    this.seasons = [];
    this.title = title;
    this.url = url;
  }

  @mobx.action
  async refreshAsync() {
    await this.loader.loadAsync(async () => {
      const result = await awe.shared.core.api.remote.seriesAsync({url: this.url});
      if (result.value) {
        this.genres = result.value.genres;
        this.imageUrl = result.value.imageUrl;
        this.seasons = result.value.seasons.map((season) => new awm.SeriesSeasonViewModel(season));
        this.synopsis = result.value.synopsis;
        this.title = result.value.title;
        this.url = result.value.url;
      } else {
        throw new Error('TODO');
      }
    });
  }

  @mobx.observable
  genres: ace.api.RemoteSeries['genres'];
  
  @mobx.observable
  imageUrl: ace.api.RemoteSeries['imageUrl'];

  @mobx.observable
  seasons: Array<awm.SeriesSeasonViewModel>;

  @mobx.observable
  synopsis: ace.api.RemoteSeries['synopsis'];

  @mobx.observable
  title: ace.api.RemoteSeries['title'];

  @mobx.observable
  url: ace.api.RemoteSeries['url'];

  @mobx.observable
  readonly loader = new awe.shared.LoaderViewModel();
}
