import * as ace from 'animesync';
import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';
const providerKey = 'provider';

export class MainViewModel extends app.BaseViewModel {
  private readonly knownUrls: Record<string, boolean>;
  private hasMorePages = false;
  private pageNumber = 1;

  constructor() {
    super();
    this.knownUrls = {};
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
      const result = await app.core.api.remote.popularAsync({providerName: this.providerName});
      if (result.value) {
        this.series = [];
        this.process(result.value);
      } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorPopularBody, language.errorPopularButtons)) {
        await this.refreshAsync();
      }
    });
  }
    
  @mobx.action
  async tryMoreAsync() {
    if (!this.hasMorePages) return;
    this.hasMorePages = false;
    await this.loader.quietAsync(async () => {
      const result = await app.core.api.remote.popularAsync({providerName: this.providerName, pageNumber: this.pageNumber + 1});
      if (result.value) {
        this.process(result.value);
        this.pageNumber++;
      } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorPopularBody, language.errorPopularButtons)) {
        this.hasMorePages = true;
        await this.tryMoreAsync();
      } else {
        this.hasMorePages = true;
      }
    });
  }

  @mobx.computed
  get hasError() {
    return !this.loader.isLoading && !this.hasSeries;
  }

  @mobx.computed
  get hasSeries() {
    return this.series.length > 0;
  }
  
  @mobx.observable
  series: Array<app.MainSeriesViewModel>;

  @mobx.observable
  readonly loader = new app.LoaderViewModel();
  
  @mobx.observable
  readonly providerName: ace.api.RemoteQueryPopular['providerName'];

  @mobx.action
  private process(search: ace.api.RemoteSearch) {
    const series = search.series.filter(x => !this.knownUrls[x.url]);
    this.hasMorePages = search.hasMorePages;
    this.series.push(...series.map(x => new app.MainSeriesViewModel(x)));
    series.forEach(x => this.knownUrls[x.url] = true);
  }
}
