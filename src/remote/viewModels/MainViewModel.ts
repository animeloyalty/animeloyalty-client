import * as ace from 'animesync';
import * as app from '..';
import * as mobx from 'mobx';
const providerKey = 'provider';

export class MainViewModel {
  constructor() {
    this.hasMorePages = false;
    this.providerName = app.core.store.get(providerKey, 'crunchyroll');
    this.series = [];
  }

  @mobx.action
  changeProvider(providerName: ace.api.RemoteQueryPopular['providerName']) {
    if (providerName === this.providerName) return;
    app.core.store.set(providerKey, providerName);
    this.providerName = providerName;
    this.series = [];
    this.refreshAsync();
  }

  @mobx.action
  async refreshAsync() {
    await this.loader.loadAsync(async () => {
      const result = await app.core.api.remote.popularAsync({providerName: this.providerName});
      if (result.value) {
        this.hasMorePages = result.value.hasMorePages;
        this.series = result.value.series.map(x => new app.MainSeriesViewModel(x));
      } else {
        throw new Error('TODO');
      }
    });
  }
  
  @mobx.observable
  hasMorePages: ace.api.RemoteSearch['hasMorePages'];

  @mobx.observable
  providerName: ace.api.RemoteQueryPopular['providerName'];

  @mobx.observable
  series: Array<app.MainSeriesViewModel>;

  @mobx.observable
  readonly loader = new app.LoaderViewModel();
}
