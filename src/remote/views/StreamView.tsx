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
class Component extends app.BaseComponent<typeof Styles, {vm: app.StreamViewModel}> {
  private _subtitleWorker?: SubtitlesOctopus;
  private _videoPlayer?: videojs.Player;

  componentDidMount() {
    document.body.style.backgroundColor = '#000';
    document.body.style.overflow = 'hidden';
  }

  private _createTracks(): Array<videojs.TextTrackOptions> {
    return this.props.vm.subtitles
      .filter(x => x.type === 'vtt')
      .map(x => ({kind: 'captions', label: x.language, language: x.language, mode: x.language === 'eng' ? 'showing' : 'hidden', src: x.url}));
  }
  
  componentWillUnmount() {
    document.body.style.removeProperty('background-color');
    document.body.style.removeProperty('overflow');

    this._videoPlayer?.dispose()
    this._videoPlayer = undefined;
    this._subtitleWorker?.dispose();
    this._subtitleWorker = undefined;
  }

  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <app.StreamHeaderView />
        <app.StreamFooterView />
        <video className="video-js" ref={(el) => this._onVideoElement(el)} />
      </mui.Grid>
    )
  }

  private _onVideoElement(videoElement: HTMLVideoElement | null) {
    if (!videoElement) return;
    const options = {autoplay: true, controlBar: false, fill: true, loadingSpinner: false};
    const data = {sources: this._createSources(), tracks: this._createTracks()};
    this._videoPlayer = videojs(videoElement, {...data, ...options}, () => {
      this.props.vm.update(this._videoPlayer);
      this._onReady(videoElement)
    });
  }

  private _createSources() {
    switch (this.props.vm.type) {
      case 'hls':
        return [{src: this.props.vm.url, type: 'application/x-mpegURL'}];
      default:
        throw new Error();
    }
  }

  private _onReady(videoElement: HTMLVideoElement) {
    const assSubtitle = this.props.vm.subtitles.find(x => x.language === 'eng' && x.type === 'ass');
    if (!assSubtitle)
      return;

    this._subtitleWorker = new SubtitlesOctopus({
      video: videoElement,
      subUrl: assSubtitle.url,
      workerUrl: 'js/subtitles-octopus-worker.js'
    });
  }
}

const Styles = mui.createStyles({
  container: {
    height: '100vh !important'
  }
});

export const StreamView = mui.withStyles(Styles)(Component);
