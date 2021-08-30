import * as app from '..';
import * as mobx from 'mobx';

export class MainCredentialViewModel extends app.BaseViewModel {
  @mobx.action
  changeCrunchyrollUsername(value: string) {
    this.crunchyrollUsername = value;
  }

  @mobx.action
  changeCrunchyrollPassword(value: string) {
    this.crunchyrollPassword = value;
  }

  @mobx.action
  changeFunimationUsername(value: string) {
    this.funimationUsername = value;
  }

  @mobx.action
  changeFunimationPassword(value: string) {
    this.funimationPassword = value;
  }

  @mobx.action
  async refreshAsync(loader: app.LoaderViewModel) {
    return await loader.loadAsync(async () => {
      const credential = await app.core.api.setting.credentialAsync();
      if (credential.value) {
        this.crunchyrollUsername = credential.value.crunchyrollUsername ?? '';
        this.crunchyrollPassword = credential.value.crunchyrollPassword ?? '';
        this.funimationUsername = credential.value.funimationUsername ?? '';
        this.funimationPassword = credential.value.funimationPassword ?? '';
        return true;
      } else {
        return false;
      }
    });
  }

  @mobx.action
  async saveAsync(loader: app.LoaderViewModel) {
    return await loader.loadAsync(async () => {
      const credential = await app.core.api.setting.credentialAsync();
      if (credential.value) {
        const model = this.createSetting(credential.value);
        const response = await app.core.api.setting.credentialPutAsync(model);
        return response.statusCode === 204;
      } else {
        return false;
      }
    });
  }

  @mobx.observable
  crunchyrollUsername = '';
  
  @mobx.observable
  crunchyrollPassword = '';

  @mobx.observable
  funimationUsername = '';

  @mobx.observable
  funimationPassword = '';

  @mobx.action
  private createSetting(credential: app.api.SettingCredential) {
    return new app.api.SettingCredential(credential, {
      crunchyrollUsername: this.crunchyrollUsername || undefined,
      crunchyrollPassword: this.crunchyrollPassword || undefined,
      funimationUsername: this.funimationUsername || undefined,
      funimationPassword: this.funimationPassword || undefined
    });
  }
}
