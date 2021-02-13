import * as app from '..';
import * as mobx from 'mobx';

export class MainCoreViewModel extends app.BaseViewModel {
  @mobx.action
  changeProxyServer(value: string) {
    this.proxyServer = value;
  }
  
  @mobx.action
  async refreshAsync(loader: app.LoaderViewModel) {
    return await loader.loadAsync(async () => {
      const core = await app.core.api.setting.coreAsync();
      if (core.value) {
        this.chromeHeadless = core.value.chromeHeadless;
        this.proxyServer = core.value.proxyServer ?? '';
        return true;
      } else {
        return false;
      }
    });
  }

  @mobx.action
  async saveAsync(loader: app.LoaderViewModel) {
    return await loader.loadAsync(async () => {
      const core = await app.core.api.setting.coreAsync();
      if (core.value) {
        const model = this.createSetting(core.value);
        const response = await app.core.api.setting.updateCoreAsync(model);
        if (response.statusCode === 204) return true;
        this.hasError = true;
        return false;
      } else {
        return false;
      }
    });
  }

  @mobx.action
  toggleChromeHeadless() {
    this.chromeHeadless = !this.chromeHeadless;
  }

  @mobx.observable
  chromeHeadless?: boolean;

  @mobx.observable
  hasError = false;

  @mobx.observable
  proxyServer = '';

  @mobx.action
  private createSetting(core: app.api.SettingCore) {
    return new app.api.SettingCore(core, {
      chromeHeadless: this.chromeHeadless,
      proxyServer: this.proxyServer || undefined
    });
  }
}
