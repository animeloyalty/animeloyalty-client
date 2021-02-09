import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';
const providerKey = 'remoteProvider';
const pageKey = 'remotePage';
const optionsKey = 'remoteOptions';

export class MainViewModel extends app.BaseViewModel {
  @mobx.action
  changeProvider(provider: app.api.RemoteProvider) {
    if (this.selectedProvider === provider) return;
    this.selectedProvider = provider;
    this.selectedPage = provider.pages[0];
    this.selectedOptions = [];
    this.update();
  }

  @mobx.action
  changePage(page: app.api.RemoteProviderPage) {
    if (this.selectedPage === page || page.options.length) return;
    this.selectedPage = page;
    this.selectedOptions = [];
    this.update();
  }

  @mobx.action
  changeOption(page: app.api.RemoteProviderPage, option: app.api.RemoteProviderPageOption) {
    if (this.selectedPage !== page) {
      this.selectedPage = page;
      this.selectedOptions = [option];
      this.update();
    } else if (page.type !== 'mixOf') {
      if (this.selectedOptions[0] === option) return;
      this.selectedOptions = [option];
      this.update();
    } else if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
      this.update();
    } else if (this.selectedOptions.length !== 1) {
      this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
      this.update();
    } else if (this.selectedProvider) {
      this.selectedPage = this.selectedProvider.pages[0];
      this.selectedOptions = [];
      this.update();
    }
  }

  @mobx.action
  async refreshAsync() {
    await this.loader.loadAsync(async () => {
      const result = await app.core.api.remote.contextAsync();
      if (result.value) {
        const preferred = this.getPreferred();
        this.providers = result.value;
        this.selectedProvider = this.providers.find(x => x.id === preferred.provider) ?? this.providers[0];
        this.selectedPage = this.selectedProvider.pages.find(x => x.id === preferred.page) ?? this.selectedProvider.pages[0];
        this.selectedOptions = this.selectedPage.options.filter(x => preferred.options?.includes(x.id));
        this.update();
      } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorProviderBody, language.errorProviderButtons)) {
        await this.refreshAsync();
      }
    });
  }

  @mobx.observable
  page?: app.MainPageViewModel;

  @mobx.observable
  providers?: Array<app.api.RemoteProvider>;

  @mobx.observable
  selectedProvider?: app.api.RemoteProvider;

  @mobx.observable
  selectedPage?: app.api.RemoteProviderPage;

  @mobx.observable
  selectedOptions: Array<app.api.RemoteProviderPageOption> = [];

  @mobx.observable
  readonly loader = new app.LoaderViewModel();

  @mobx.action
  private getPreferred() {
    const provider = app.core.store.get<app.api.RemoteProviderId>(providerKey, app.api.RemoteProviderId.Crunchyroll);
    const page = app.core.store.getString(pageKey, '');
    const options = app.core.store.get(optionsKey, '').split(',').filter(Boolean);
    return new app.api.RemoteQueryPage({provider, page, options});
  }

  @mobx.action
  private setPreferred(provider?: app.api.RemoteProviderId, page?: string, options?: Array<string>) {
    app.core.store.set(providerKey, provider);
    app.core.store.set(pageKey, page);
    app.core.store.set(optionsKey, options?.join(','));
  }

  @mobx.action
  private update() {
    const provider = this.selectedProvider?.id;
    const page = this.selectedPage?.id;
    const options = this.selectedOptions.map(x => x.id);
    this.page = app.MainPageViewModel.createViewModel(this.loader, new app.api.RemoteQueryPage({provider, page, options}));
    this.setPreferred(provider, page, options);
  }
}
