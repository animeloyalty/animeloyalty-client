import * as app from '..';
const fonts = ['assets/default.woff2', 'assets/arabic.woff2'];
const workerUrl = 'subtitles-octopus-4.0.0/subtitles-octopus-worker.js';

export class Octopus {
  private readonly subtitle: app.ISubtitle;
  private readonly worker: SubtitlesOctopus;
  private isWaiting = true;

  constructor(element: HTMLVideoElement, subtitle: app.ISubtitle) {
    const onWorkerMessage = this.onWorkerMessage.bind(this);
    this.subtitle = subtitle;
    this.worker = new SubtitlesOctopus({video: element, subUrl: subtitle.url, workerUrl, fonts, onWorkerMessage});
    this.worker.getStyles();
  }

  dispose() {
    try {
      this.worker.dispose();
    } catch {
      return;
    }
  }

  private onWorkerMessage(event: SubtitlesOctopusEvent) {
    switch (event.data.target) {
      case 'canvas':
        return event.data.op === 'renderCanvas' && this.isWaiting;
      case 'get-styles':
        const defaultStyles = event.data.styles
          .filter(x => /^(?:Default|Main)/i.test(x.Name))
          .sort((a, b) => b.FontSize - a.FontSize);
        const fontSize = defaultStyles.length
          ? defaultStyles[0].FontSize
          : 24;
        const newStyles = event.data.styles
          .map(x => ({scale: 100 / fontSize * x.FontSize, style: x}))
          .map(x => ({...x.style, FontSize: Math.floor(x.scale / 100 * getSize(this.subtitle))}));
        newStyles.forEach((x, i) => this.worker.setStyle(x, i));
        setTimeout(() => this.isWaiting = false, 100);
        return true;
      default:
        return false;
    }
  }
}

function getSize(subtitle: app.ISubtitle) {
  switch (subtitle.size) {
    case 'tiny': return 8;
    case 'small': return 12;
    case 'normal': return 16;
    case 'large': return 20;
    case 'huge': return 24;
    default: return 16;
  }
}
