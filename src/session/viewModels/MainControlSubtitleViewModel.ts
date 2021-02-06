import * as app from '..';
import * as mobx from 'mobx';
import {language} from '../language';
const preferredKey = 'preferredSubtitle';
const preferredNone = 'none';

export class MainControlSubtitleViewModel implements app.IVideoHandler, app.IViewHandler {
  constructor(
    private readonly bridge: app.Bridge
  ) {}

  @mobx.action
  clear() {
    if (!this.canSelect || !this.selectedSubtitle) return;
    app.core.store.set(preferredKey, preferredNone);
    this.selectedSubtitle = undefined;
    this.bridge.dispatchRequest({type: 'clearSubtitle'});
  }

  @mobx.action
  select(subtitle: app.ISubtitle) {
    if (!this.canSelect || this.selectedSubtitle === subtitle) return;
    app.core.store.set(preferredKey, subtitle.language);
    this.selectedSubtitle = subtitle;
    this.bridge.dispatchRequest({type: 'loadSubtitle', subtitle});
  }

  @mobx.action
  onVideoRequest(event: app.VideoRequest) {
    switch (event.type) {
      case 'subtitles':
        this.subtitles = event.subtitles.map(x => ({...x, displayName: getDisplayName(x)})).sort((a, b) => a.displayName.localeCompare(b.displayName));
        this.loadSubtitle();
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
    return Boolean(this.subtitles.length);
  }

  @mobx.observable
  selectedSubtitle?: app.ISubtitle;

  @mobx.observable
  subtitles: Array<app.ISubtitle> = [];

  @mobx.action
  private loadSubtitle() {
    const preferred = app.core.store.getString(preferredKey, 'eng');
    if (preferred === preferredNone || this.tryLoadSubtitle(preferred)) return;
    this.tryLoadSubtitle('eng');
  }

  @mobx.action
  private tryLoadSubtitle(language: string | null) {
    const subtitle = this.subtitles.find(x => x.language === language);
    if (subtitle) {
      this.selectedSubtitle = subtitle;
      this.bridge.dispatchRequest({type: 'loadSubtitle', subtitle});
      return true;
    } else {
      return false;
    }
  }
}

function getDisplayName(subtitle: app.ISubtitle) {
  switch (subtitle.language) {
    case 'ara': return language.subtitleAra;
    case 'eng': return language.subtitleEng;
    case 'fre': return language.subtitleFre;
    case 'ger': return language.subtitleGer;
    case 'ita': return language.subtitleIta;
    case 'por': return language.subtitlePor;
    case 'rus': return language.subtitleRus;
    case 'spa': return language.subtitleSpa;
    default: throw new Error();
  }
}
