import * as ace from 'animesync';
import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class MainViewModel {
  constructor() {
    this.hasMorePages = false;
    this.series = [];
  }

  @mobx.action
  async refreshAsync() {
    await this.loader.loadAsync(async () => {
      const result = await awe.shared.core.api.remote.popularAsync({providerName: 'crunchyroll'});
      if (result.value) {
        this.hasMorePages = result.value.hasMorePages;
        this.series = result.value.series.map(x => new awm.MainSeriesViewModel(x));
      } else {
        throw new Error('TODO');
      }
    });
  }
  
  @mobx.observable
  hasMorePages: ace.api.RemoteSearch['hasMorePages'];

  @mobx.observable
  series: Array<awm.MainSeriesViewModel>;

  @mobx.observable
  readonly loader = new awe.shared.LoaderViewModel();
}
