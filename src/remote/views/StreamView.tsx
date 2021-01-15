import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import videojs from 'video.js';

// TODO: back button, osd, cursor hide, custom controls, clean up.

@mobxReact.observer
export class StreamView extends app.BaseComponent<typeof StreamViewStyles, {vm: app.StreamViewModel}> {
  private readonly _videoRef = React.createRef<HTMLVideoElement>();
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
    for (const subtitle of this.props.vm.subtitles) {
      switch (subtitle.type) {
        case 'ass':
          break;
        case 'vtt':
          break;
        default:
          throw new Error();
      }
    }
  }
}

export const StreamViewStyles = mui.createStyles({
  video: {
    height: '100vh !important'
  }
});
