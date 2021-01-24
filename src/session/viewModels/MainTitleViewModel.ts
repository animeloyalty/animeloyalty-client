import * as app from '..';
import * as mobx from 'mobx';

export class MainTitleViewModel {
  constructor(
    private readonly navigator: app.INavigator,
    private readonly onLeave: Function
  ) {}

  @mobx.action
  leave() {
    this.onLeave();
  }

  @mobx.computed
  get displayName() {
    const current = this.navigator.current;
    const name = isFinite(parseFloat(current.episodeName))
      ? current.episodeName.padStart(2, '0')
      : current.episodeName;
    return current.episodeTitle
      ? `Episode ${name} - ${current.episodeTitle}`
      : `Episode ${name}`;
  }

  @mobx.computed
  get seasonName() {
    return this.navigator.current.seasonName;
  }

  @mobx.computed
  get seriesName() {
    return this.navigator.current.seriesName;
  }
}
