import * as ace from 'animesync';
import * as awe from '../..';
import * as awm from '..';
import * as mobx from 'mobx';

export class MainSeriesViewModel {
  constructor(series: ace.api.RemoteSearchSeries) {
    this.imageUrl = series.imageUrl
    this.title = series.title;
    this.url = series.url;
  }

  @mobx.action
  open() {
    const controller = awm.SeriesController.createController(this.title, this.url);
    awe.shared.core.screen.open(controller);
  }

  @mobx.observable
  imageUrl: ace.api.RemoteSearchSeries['imageUrl'];
  
  @mobx.observable
  title: ace.api.RemoteSearchSeries['title'];

  @mobx.observable
  url: ace.api.RemoteSearchSeries['url'];
}
