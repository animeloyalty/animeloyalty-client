import * as mobx from 'mobx';

export class LoaderViewModel {
  @mobx.action
  async loadAsync<T>(runAsync: () => Promise<T>) {
    try {
      this.loadCount++;
      return await runAsync();
    } finally {
      this.loadCount--;
    }
  }

  @mobx.computed
  get isLoading() {
    return this.loadCount !== 0;
  }

  @mobx.observable
  private loadCount = 0;
}
