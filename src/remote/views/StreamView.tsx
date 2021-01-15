import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import videojs from 'video.js';

// TODO: back button, osd, cursor hide, custom controls, clean up.

declare class SubtitlesOctopus {
  constructor(options: {
    video: HTMLVideoElement,
    subUrl: string,
    workerUrl: string
  });
  dispose(): void;
}

@mobxReact.observer
export class StreamView extends app.BaseComponent<typeof StreamViewStyles, {vm: app.StreamViewModel}> {
  private readonly _videoRef = React.createRef<HTMLVideoElement>();
  private _subtitleWorker?: SubtitlesOctopus;
  private _videoPlayer?: videojs.Player;

  componentDidMount() {
    if (!this._videoRef.current) return;
    const options = {autoplay: true, controls: true, fill: true};
    const data = {sources: this._createSources(), tracks: this._createTracks()};
    this._videoPlayer = videojs(this._videoRef.current, {...data, ...options}, this._onReady.bind(this));
    
    document.body.style.overflow = 'hidden';
  }

  private _createTracks(): Array<videojs.TextTrackOptions> {
    return this.props.vm.subtitles
      .filter(x => x.type === 'vtt')
      .map(x => ({kind: 'captions', label: x.language, language: x.language, mode: x.language === 'eng' ? 'showing' : 'hidden', src: x.url}));
  }
  
  componentWillUnmount() {
    document.body.style.overflow = 'inherit';

    this._videoPlayer?.dispose()
    this._videoPlayer = undefined;
    this._subtitleWorker?.dispose();
    this._subtitleWorker = undefined;
  }

  render() {
    return (
      <mui.Grid>
        <video className={`${this.classes.video} video-js`} ref={this._videoRef} />
      </mui.Grid>
    )
  }

  private _createSources() {
    switch (this.props.vm.type) {
      case 'hls':
        return [{src: this.props.vm.url, type: 'application/x-mpegURL'}];
      default:
        throw new Error();
    }
  }

  private _onReady() {
    if (!this._videoRef.current)
      return;
    const assSubtitle = this.props.vm.subtitles.find(x => x.language === 'eng' && x.type === 'ass');
    if (!assSubtitle)
      return;

    this._subtitleWorker = new SubtitlesOctopus({
      video: this._videoRef.current,
      subUrl: assSubtitle.url,
      workerUrl: 'js/subtitles-octopus-worker.js'
    });
  }
}

export const StreamViewStyles = mui.createStyles({
  video: {
    height: '100vh !important'
  }
});
