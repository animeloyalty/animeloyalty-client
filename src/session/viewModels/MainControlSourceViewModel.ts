import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';
const preferredKey = 'preferredSource';

export class MainControlSourceViewModel implements app.IVideoHandler, app.IViewHandler {
  constructor(
    private readonly bridge: app.Bridge
  ) {}

  @mobx.action
  select(source: app.ISource) {
    if (!this.canSelect || this.selectedSource === source) return;
    app.core.store.set(preferredKey, source.resolutionY);
    this.selectedSource = source;
    this.bridge.dispatchRequest({type: 'loadSource', source});
  }

  @mobx.action
  onVideoRequest(event: app.VideoRequest) {
    switch (event.type) {
      case 'sources':
        this.sources = event.sources.map(x => ({...x, displayName: getDisplayName(x)})).sort((a, b) => (b.resolutionY ?? 0) - (a.resolutionY ?? 0));
        this.loadSource();
        break;
    }
  }
  
  @mobx.action
  onViewMount() {
    this.bridge.subscribe(this);
  }

  @mobx.action
  onViewUnmount() {
    this.bridge.unsubscribe(this);
  }

  @mobx.computed
  get canSelect() {
    return this.sources.length > 1;
  }

  @mobx.observable
  selectedSource?: app.ISource;

  @mobx.observable
  sources: Array<app.ISource> = [];

  @mobx.action
  private loadSource() {
    const preferred = app.core.store.getNumber(preferredKey, 1080);
    const source = this.sources.filter(x => x.resolutionY && x.resolutionY <= preferred)[0] ?? this.sources[0];
    this.selectedSource = source;
    this.bridge.dispatchRequest({type: 'loadSource', source});
  }
}

function getDisplayName(source: app.ISource) {
  if (source.resolutionY) {
    return `${source.resolutionY}p`;
  } else {
    return language.source;
  }
}
