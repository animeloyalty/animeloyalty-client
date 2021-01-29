import * as ace from 'animesync';
import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';

export class SeriesViewModel extends app.BaseViewModel implements app.IInputHandler {
  constructor(title: string, url: string) {
    super();
    this.genres = [];
    this.imageUrl = '';
    this.seasons = [];
    this.title = title;
    this.url = url;
  }

  @mobx.action
  onInputKey(event: app.InputKeyEvent) {
    if (event.type === 'escape') {
      app.core.view.leave();
      return true;
    } else {
      return false;
    }
  }

  @mobx.action
  async refreshAsync() {
    await this.loader.loadAsync(async () => {
      const result = await app.core.api.remote.seriesAsync({url: this.url});
      if (result.value) {
        this.genres = result.value.genres.map(x => x.substr(0, 1).toUpperCase() + x.substr(1)).sort();
        this.imageUrl = result.value.imageUrl;
        this.seasons = result.value.seasons.map((_, seasonIndex) => new app.SeriesSeasonViewModel(result.value, seasonIndex));
        this.synopsis = result.value.synopsis;
        this.title = result.value.title;
      } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorSeriesBody, language.errorSeriesButtons)) {
        await this.refreshAsync();
      } else if (this.isViewMounted) {
        app.core.view.leave();
      }
    });
  }

  @mobx.computed
  get hasGenres() {
    return Boolean(this.genres.length);
  }

  @mobx.observable
  genres: ace.api.RemoteSeries['genres'];
  
  @mobx.observable
  imageUrl: ace.api.RemoteSeries['imageUrl'];

  @mobx.observable
  seasons: Array<app.SeriesSeasonViewModel>;

  @mobx.observable
  synopsis: ace.api.RemoteSeries['synopsis'];

  @mobx.observable
  title: ace.api.RemoteSeries['title'];

  @mobx.observable
  readonly loader = new app.LoaderViewModel();

  @mobx.observable
  readonly url: ace.api.RemoteSeries['url'];
}
