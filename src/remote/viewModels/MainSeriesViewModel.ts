import * as app from '..';
import * as ace from 'animesync';
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
    app.core.screen.open(controller);
  }

  @mobx.observable
  imageUrl: ace.api.RemoteSearchSeries['imageUrl'];
  
  @mobx.observable
  title: ace.api.RemoteSearchSeries['title'];

  @mobx.observable
  url: ace.api.RemoteSearchSeries['url'];
}
