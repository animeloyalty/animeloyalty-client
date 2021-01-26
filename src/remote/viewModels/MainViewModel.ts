import * as ace from 'animesync';
import * as app from '..';
import * as mobx from 'mobx';
const providerKey = 'provider';

export class MainViewModel {
  private readonly existingUrls: Record<string, boolean>;
  private hasMorePages = false;
  private pageNumber = 1;

  constructor() {
    this.existingUrls = {};
    this.providerName = app.core.store.get(providerKey, 'crunchyroll');
    this.series = [];
  }

  @mobx.action
  changeProvider(providerName: ace.api.RemoteQueryPopular['providerName']) {
    if (providerName === this.providerName) return;
    app.core.store.set(providerKey, providerName);
    app.core.view.replace(app.MainController.createController());
  }

  @mobx.action
  async refreshAsync() {
    await this.loader.loadAsync(async () => {
      const result = await app.core.api.remote.popularAsync({providerName: this.providerName, pageNumber: this.pageNumber});
      if (result.value) {
        const series = result.value.series.filter(x => !this.existingUrls[x.url]);
        this.hasMorePages = result.value.hasMorePages;
        this.series.push(...series.map(x => new app.MainSeriesViewModel(x)));
        series.forEach(x => this.existingUrls[x.url] = true);
      } else {
        throw new Error('TODO');
      }
    });
  }
    
  @mobx.action
  async tryNextAsync() {
    if (!this.hasMorePages) return;
    await this.loader.quietAsync(async () => {
      this.hasMorePages = false;
      this.pageNumber++;
      await this.refreshAsync();
    });
  }

  @mobx.computed
  get hasSeries() {
    return Boolean(this.series.length);
  }
  
  @mobx.observable
  providerName: ace.api.RemoteQueryPopular['providerName'];
  
  @mobx.observable
  series: Array<app.MainSeriesViewModel>;

  @mobx.observable
  readonly loader = new app.LoaderViewModel();
}
