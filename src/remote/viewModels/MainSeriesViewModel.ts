import * as ace from 'animesync';
import * as app from '..';
import * as mobx from 'mobx';

export class MainSeriesViewModel {
  constructor(series: ace.api.RemoteSearchSeries) {
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
  readonly imageUrl: ace.api.RemoteSearchSeries['imageUrl'];
  
  @mobx.observable
  readonly title: ace.api.RemoteSearchSeries['title'];

  @mobx.observable
  readonly url: ace.api.RemoteSearchSeries['url'];
}
