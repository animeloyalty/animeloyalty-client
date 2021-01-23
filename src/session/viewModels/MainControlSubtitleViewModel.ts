import * as awm from '..';
import * as mobx from 'mobx';
const languageKey = 'language';
const languageNone = 'none';

export class MainControlSubtitleViewModel implements awm.IBridgeHandler {
  constructor(
    private readonly bridge: awm.Bridge
  ) {}

  @mobx.action
  attach() {
    this.bridge.subscribe(this);
    return this;
  }

  @mobx.action
  clear() {
    if (!this.selectedSubtitle) return;
    this.bridge.dispatchRequest({type: 'clearSubtitle'});
    this.selectedSubtitle = undefined;
    localStorage.setItem(languageKey, languageNone);
  }

  @mobx.action
  select(subtitle: awm.ISubtitle) {
    if (this.selectedSubtitle === subtitle) return;
    this.bridge.dispatchRequest({type: 'loadSubtitle', subtitle});
    this.selectedSubtitle = subtitle;
    localStorage.setItem(languageKey, subtitle.language);
  }

  @mobx.action
  onVideoRequest(event: awm.VideoRequest) {
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
  selectedSubtitle?: awm.ISubtitle;

  @mobx.observable
  subtitles: Array<awm.ISubtitle> = [];

  private loadSubtitle() {
    const language = localStorage.getItem(languageKey)
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
