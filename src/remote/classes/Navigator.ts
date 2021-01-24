import * as ace from 'animesync';
import * as app from '..';
import {session} from '../..';

export class Navigator implements session.INavigator {
  private constructor(private series: ace.api.RemoteSeries, private index: number) {
    this.episodes = series.seasons.reduce((p, s) => p.concat(s.episodes.map(e => new app.NavigatorEpisode(series, s, e))), [] as Array<app.NavigatorEpisode>);
    this.current = this.episodes[this.index];
    this.hasNext = this.index < this.episodes.length - 1;
    this.hasPrevious = this.index > 0;
  }

  static create(series: ace.api.RemoteSeries, seasonIndex: number, episodeIndex: number) {
    return new Navigator(series, series.seasons.slice(0, seasonIndex).reduce((p, season) => p + season.episodes.length, episodeIndex));
  }

  openNext() {
    const navigator = new Navigator(this.series, this.index + 1);
    const controller = app.StreamController.createController(navigator, this.episodes[this.index + 1].episodeUrl);
    app.core.view.replace(controller);
  }

  openPrevious() {
    const navigator = new Navigator(this.series, this.index - 1);
    const controller = app.StreamController.createController(navigator, this.episodes[this.index - 1].episodeUrl);
    app.core.view.replace(controller);
  }

  readonly current: app.NavigatorEpisode
  readonly episodes: Array<app.NavigatorEpisode>;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}
