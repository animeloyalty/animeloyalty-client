import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';
type QueryPageOrSearch = app.api.RemoteQueryPage | app.api.RemoteQuerySearch;

export class MainPageViewModel extends app.BaseViewModel {
  private readonly knownSeries: Record<string, boolean>;
  private readonly query: QueryPageOrSearch;
  private hasMorePages = false;
  private pageNumber = 1;

  private constructor(query: QueryPageOrSearch) {
    super();
    this.knownSeries = {};
    this.query = query;
  }

  static createViewModel(query: QueryPageOrSearch) {
    const vm = new MainPageViewModel(query);
    vm.refreshAsync();
    return vm;
  }
  
  @mobx.action
  async refreshAsync() {
    this.hasError = false;
    const result = await this.loader.loadAsync(() => this.query instanceof app.api.RemoteQuerySearch
      ? app.core.api.remote.searchAsync(this.query)
      : app.core.api.remote.pageAsync(this.query));
    if (result.value) {
      this.process(result.value);
    } else if (this.isViewMounted) {
      this.hasError = true;
      if (await app.core.dialog.openAsync(language.errorProviderBody, language.errorProviderButtons)) {
        await this.refreshAsync();
      }
    }
  }
  
  @mobx.action
  async tryMoreAsync() {
    if (!this.hasMorePages) return;
    this.hasMorePages = false;
    const result = await this.loader.quietAsync(() => this.query instanceof app.api.RemoteQuerySearch
      ? app.core.api.remote.searchAsync(new app.api.RemoteQuerySearch(this.query, {pageNumber: this.pageNumber + 1}))
      : app.core.api.remote.pageAsync(new app.api.RemoteQueryPage(this.query, {pageNumber: this.pageNumber + 1})));
    if (result.value) {
      this.process(result.value);
      this.pageNumber++;
    } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorProviderBody, language.errorProviderButtons)) {
      this.hasMorePages = true;
      await this.tryMoreAsync();
    } else {
      this.hasMorePages = true;
    }
  }

  @mobx.computed
  get hasSeries() {
    if (this.hasError) return false;
    if (this.loader.isLoading && !this.loader.isQuiet) return false;
    return this.series.length > 0;
  }

  @mobx.computed
  get isEmpty() {
    if (this.hasError) return false;
    if (this.loader.isLoading) return false;
    return this.series.length === 0;
  }

  @mobx.computed
  get isNarrow() {
    const isCrunchyroll = this.query.provider === app.api.RemoteProviderId.Crunchyroll;
    const isSearch = this.query instanceof app.api.RemoteQuerySearch;
    return isCrunchyroll && isSearch;
  }
  
  @mobx.observable
  hasError = false;

  @mobx.observable
  readonly loader = new app.LoaderViewModel();

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
