import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';

export class SeriesViewModel extends app.BaseViewModel implements app.IInputHandler {
  constructor(title: string, url: string) {
    super();
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
        this.imageUrl = result.value.imageUrl;
        this.seasons = result.value.seasons.map((_, seasonIndex) => new app.SeriesSeasonViewModel(result.value!, seasonIndex));
        this.synopsis = result.value.synopsis;
        this.title = result.value.title;
      } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorSeriesBody, language.errorSeriesButtons)) {
        await this.refreshAsync();
      } else if (this.isViewMounted) {
        app.core.view.leave();
      }
    });
  }
  
  @mobx.observable
  imageUrl: app.api.RemoteSeries['imageUrl'];

  @mobx.observable
  seasons: Array<app.SeriesSeasonViewModel>;

  @mobx.observable
  synopsis: app.api.RemoteSeries['synopsis'];

  @mobx.observable
  title: app.api.RemoteSeries['title'];

  @mobx.observable
  readonly loader = new app.LoaderViewModel();

  @mobx.observable
  readonly url: app.api.RemoteSeries['url'];
}
