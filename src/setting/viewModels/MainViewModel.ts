import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';

export class MainViewModel extends app.BaseViewModel implements app.IInputHandler {
  constructor(private readonly onClose: (success: boolean) => void) {
    super();
  }

  @mobx.action
  cancelAsync() {
    this.onClose(false);
  }

  @mobx.action
  onInputKey(event: app.InputKeyEvent) {
    if (event.type === 'escape') {
      this.cancelAsync();
      return true;
    } else {
      return false;
    }
  }

  @mobx.action
  async refreshAsync() {
    this.isReady = false;
    return await this.loader.loadAsync(async () => {
      const corePromise = this.core.refreshAsync(this.loader);
      const credentialPromise = this.credential.refreshAsync(this.loader);
      const result = await Promise.all([corePromise, credentialPromise]);
      if (result.every(Boolean)) {
        this.isReady = true;
      } else if (this.isViewMounted && await app.core.dialog.openAsync(language.errorBody, language.errorButtons)) {
        await this.refreshAsync();
      }
    });
  }

  @mobx.action
  async saveAsync() {
    this.isSaving = true;
    return await this.loader.loadAsync(async () => {
      const corePromise = this.core.saveAsync(this.loader);
      const credentialPromise = this.credential.saveAsync(this.loader);
      const result = await Promise.all([corePromise, credentialPromise]);
      if (result.every(Boolean)) {
        this.onClose(true);
      } else {
        this.isSaving = false;
      }
    });
  }
  
  @mobx.observable
  core = new app.MainCoreViewModel();

  @mobx.observable
  credential = new app.MainCredentialViewModel();

  @mobx.observable
  isReady = false;

  @mobx.observable
  isSaving = false;

  @mobx.observable
  readonly loader = new app.LoaderViewModel();
}
