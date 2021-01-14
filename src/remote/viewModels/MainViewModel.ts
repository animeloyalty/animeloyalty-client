import * as app from '..';
import * as mobx from 'mobx';

export class MainViewModel {
  @mobx.action
  async refreshAsync() {
    await app.core.screen.loadAsync(async () => {
      const result = await app.core.api.remote.popularAsync({providerName: 'crunchyroll'});
      if (result.value) {
        this.hasMorePages = result.value.hasMorePages;
        this.series = result.value.series.map(x => new app.MainSeriesViewModel(x));
      } else {
        throw new Error('TODO');
      }
    });
  }

  @mobx.observable
  hasMorePages = false;

  @mobx.observable
  series: Array<app.MainSeriesViewModel> = [];
}
