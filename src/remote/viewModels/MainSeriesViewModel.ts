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
  imageUrl: app.RemoteSearchSeries['imageUrl'];
  
  @mobx.observable
  title: app.RemoteSearchSeries['title'];

  @mobx.observable
  url: app.RemoteSearchSeries['url'];
}
