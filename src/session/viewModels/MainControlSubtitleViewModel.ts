import * as app from '..';
import * as mobx from 'mobx';
const languageKey = 'language';
const languageNone = 'none';

export class MainControlSubtitleViewModel implements app.IBridgeHandler {
  constructor(
    private readonly bridge: app.Bridge
  ) {}

  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    return this;
  }

  @mobx.action
  clear() {
    if (!this.canSelect || !this.selectedSubtitle) return;
    app.core.store.set(languageKey, languageNone);
    this.bridge.dispatchRequest({type: 'clearSubtitle'});
    this.selectedSubtitle = undefined;
  }

  @mobx.action
  select(subtitle: app.ISubtitle) {
    if (!this.canSelect || this.selectedSubtitle === subtitle) return;
    app.core.store.set(languageKey, subtitle.language);
    this.bridge.dispatchRequest({type: 'loadSubtitle', subtitle});
    this.selectedSubtitle = subtitle;
  }

  @mobx.action
  onVideoRequest(event: app.VideoRequest) {
    switch (event.type) {
      case 'subtitles':
        this.subtitles = event.subtitles.sort((a, b) => a.displayName.localeCompare(b.displayName));
        this.loadSubtitle();
        break;
    }
  }

  @mobx.computed
  get canSelect() {
    return Boolean(this.subtitles.length);
  }

  @mobx.observable
  selectedSubtitle?: app.ISubtitle;

  @mobx.observable
  subtitles: Array<app.ISubtitle> = [];

  private loadSubtitle() {
    const language = app.core.store.getString(languageKey, 'eng');
    if (language === languageNone || this.tryLoadSubtitle(language)) return;
    this.tryLoadSubtitle('eng');
  }

  private tryLoadSubtitle(language: string | null) {
    const subtitle = this.subtitles.find(x => x.language === language);
    if (subtitle) {
      this.bridge.dispatchRequest({type: 'loadSubtitle', subtitle});
      this.selectedSubtitle = subtitle;
      return true;
    } else {
      return false;
    }
  }
}
