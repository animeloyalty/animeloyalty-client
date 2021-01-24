import * as ace from 'animesync';
import * as awe from '../..';
import * as awm from '..';

export class Navigator implements awe.session.INavigator {
  private constructor(private series: ace.api.RemoteSeries, private index: number) {
    this.episodes = series.seasons.reduce((p, s) => p.concat(s.episodes.map(e => new awm.NavigatorEpisode(series, s, e))), [] as Array<awm.NavigatorEpisode>);
    this.current = this.episodes[this.index];
    this.hasNext = this.index < this.episodes.length - 1;
    this.hasPrevious = this.index > 0;
  }

  static create(series: ace.api.RemoteSeries, seasonIndex: number, episodeIndex: number) {
    return new Navigator(series, series.seasons.slice(0, seasonIndex).reduce((p, season) => p + season.episodes.length, episodeIndex));
  }

  openNext() {
    const navigator = new Navigator(this.series, this.index + 1);
    const controller = awm.StreamController.createController(navigator, this.episodes[this.index + 1].episodeUrl);
    awe.shared.core.view.replace(controller);
  }

  openPrevious() {
    const navigator = new Navigator(this.series, this.index - 1);
    const controller = awm.StreamController.createController(navigator, this.episodes[this.index - 1].episodeUrl);
    awe.shared.core.view.replace(controller);
  }

  readonly current: awm.NavigatorEpisode
  readonly episodes: Array<awm.NavigatorEpisode>;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}
