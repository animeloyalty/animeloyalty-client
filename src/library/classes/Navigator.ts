import * as app from '..';
import {session} from '../..';

export class Navigator implements session.INavigator {
  private constructor(private series: app.api.LibrarySeries, private index: number) {
    this.episodes = series.seasons.reduce((p, s) => p.concat(s.episodes.map(e => new app.NavigatorEpisode(series, s, e))), [] as Array<app.NavigatorEpisode>);
    this.current = this.episodes[this.index];
    this.hasNext = this.index < this.episodes.length - 1;
    this.hasPrevious = this.index > 0;
  }

  static create(series: app.api.LibrarySeries, seasonIndex: number, episodeIndex: number) {
    return new Navigator(series, series.seasons.slice(0, seasonIndex).reduce((p, s) => p + s.episodes.length, episodeIndex));
  }

  openNext(shouldDelay: boolean) {
    if (!this.hasNext) return;
    const navigator = new Navigator(this.series, this.index + 1);
    const controller = app.StreamController.createController(navigator, this.series.id, this.episodes[this.index + 1].episodeId, shouldDelay);
    app.core.view.replace(controller);
  }

  openPrevious(shouldDelay: boolean) {
    if (!this.hasPrevious) return;
    const navigator = new Navigator(this.series, this.index - 1);
    const controller = app.StreamController.createController(navigator, this.series.id, this.episodes[this.index - 1].episodeId, shouldDelay);
    app.core.view.replace(controller);
  }

  preloadNext() {
    return;
  }

  readonly current: app.NavigatorEpisode
  readonly episodes: Array<app.NavigatorEpisode>;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}
