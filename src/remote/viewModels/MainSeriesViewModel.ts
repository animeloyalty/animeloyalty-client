import * as app from '..';
import * as mobx from 'mobx';

export class MainSeriesViewModel {
  constructor(series: app.RemoteSearchSeries) {
    this.imageUrl = series.imageUrl
    this.title = series.title;
    this.url = series.url;
  }

  @mobx.action
  openAsync() {
    throw new Error('TODO');
  }

  @mobx.observable
  readonly imageUrl: string;
  
  @mobx.observable
  readonly title: string;

  @mobx.observable
  readonly url: string;
}
