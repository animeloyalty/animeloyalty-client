import * as app from '..';
import * as mobx from 'mobx';

export class MainSeriesViewModel {
  constructor(series: app.RemoteSearchSeries) {
    this.imageUrl = series.imageUrl
    this.title = series.title;
    this.url = series.url;
  }

  @mobx.action
  async openAsync() {
    await app.core.screen.openChildAsync(app.SeriesController.createConstruct(this.url));
  }

  @mobx.observable
  imageUrl: string;
  
  @mobx.observable
  title: string;

  @mobx.observable
  url: string;
}
