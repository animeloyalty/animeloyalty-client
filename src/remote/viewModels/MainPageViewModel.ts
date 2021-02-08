import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';

export class MainPageViewModel extends app.BaseViewModel {
  private readonly knownSeries: Record<string, boolean>;
  private readonly loader: app.LoaderViewModel;
  private readonly query: app.api.RemoteQueryPage;
  private hasMorePages = false;
  private pageNumber = 1;

  private constructor(loader: app.LoaderViewModel, query: app.api.RemoteQueryPage) {
    super();
    this.knownSeries = {};
    this.loader = loader;
    this.query = query;
  }

  static createViewModel(loader: app.LoaderViewModel, query: app.api.RemoteQueryPage) {
    const vm = new MainPageViewModel(loader, query);
    vm.refreshAsync();
    return vm;
  }
  
  @mobx.action
  async refreshAsync() {
    await this.loader.loadAsync(async () => {
      const model = new app.api.RemoteQueryPage(this.query);
      const result = await app.core.api.remote.pageAsync(model);
      if (result.value) {
        this.process(result.value);
      } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorProviderBody, language.errorProviderButtons)) {
        await this.refreshAsync();
      }
    });
  }
    
  @mobx.action
  async tryMoreAsync() {
    if (!this.hasMorePages) return;
    this.hasMorePages = false;
    await this.loader.quietAsync(async () => {
      const model = new app.api.RemoteQueryPage(this.query, {pageNumber: this.pageNumber + 1});
      const result = await app.core.api.remote.pageAsync(model);
      if (result.value) {
        this.process(result.value);
        this.pageNumber++;
      } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorProviderBody, language.errorProviderButtons)) {
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
  readonly series: Array<app.MainPageSeriesViewModel> = [];

  @mobx.action
  private process(search: app.api.RemoteSearch) {
    const series = search.series.filter(x => !this.knownSeries[x.url]);
    this.hasMorePages = search.hasMorePages;
    this.series.push(...series.map(x => new app.MainPageSeriesViewModel(x)));
    series.forEach(x => this.knownSeries[x.url] = true);
  }
}
