import * as app from '..';
import * as mobx from 'mobx';

export class MainPageSeriesViewModel {
  constructor(series: app.api.RemoteSearchSeries) {
    this.imageUrl = series.imageUrl
    this.title = series.title;
    this.url = series.url;
  }

  @mobx.action
  open() {
    const controller = app.SeriesController.createController(this.title, this.url);
    app.core.view.open(controller);
  }

  @mobx.observable
  readonly imageUrl: app.api.RemoteSearchSeries['imageUrl'];
  
  @mobx.observable
  readonly title: app.api.RemoteSearchSeries['title'];

  @mobx.observable
  readonly url: app.api.RemoteSearchSeries['url'];
}
