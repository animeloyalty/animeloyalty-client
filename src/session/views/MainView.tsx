import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import videojs from 'video.js';

@mobxReact.observer
class Component extends app.BaseInputComponent<typeof Styles, {bridge: app.Bridge, vm: app.MainViewModel}> implements app.IBridgeHandler {
  private _element?: HTMLVideoElement;
  private _player?: videojs.Player;
  private _worker?: SubtitlesOctopus;

  componentDidMount() {
    super.componentDidMount();
    document.body.style.overflow = 'hidden';
  }
  
  componentWillUnmount() {
    super.componentWillUnmount();
    document.body.style.removeProperty('overflow');
    this._player?.dispose()
    this._worker?.dispose();
  }

  onVideoRequest(request: app.VideoRequest) {
    switch (request.type) {
      case 'clearSubtitle':
        this.clearSubtitle();
        break;
      case 'loadStream':
        this._player?.src({src: request.url, type: request.videoType});
        break;
      case 'loadSubtitle':
        if (request.subtitle.type === 'vtt') {
          this.clearSubtitle();
          this._player?.addRemoteTextTrack({mode: 'showing', src: request.subtitle.url}, true);
          break;
        } else {
          this.clearSubtitle();
          this._worker = new SubtitlesOctopus({video: this._element, subUrl: request.subtitle.url, workerUrl: 'js/subtitles-octopus-worker.js'});
          break;
        }
      case 'pause':
        this._player?.pause();
        break;
      case 'play':
        this._player?.play();
        break;
      case 'seek':
        this._player?.currentTime(request.time);
        break;
    }
  }

  render() {
    return (
      <mui.Grid className={this.props.vm.isHidden ? this.classes.containerHidden : this.classes.container}>
        <video className="video-js" ref={(el) => this.onCreate(el)} onClick={() => this.props.vm.togglePlay()} />
        <app.LoaderComponent open={this.props.vm.isWaiting} />
        <mui.Grid className={this.classes.ui}>
          <app.MainControlView vm={this.props.vm.control} />
          <app.MainTitleView vm={this.props.vm.title} />
        </mui.Grid>
      </mui.Grid>
    );
  }

  private clearSubtitle() {
    const tracks = this._player?.remoteTextTracks();
    if (tracks) Array.from(tracks).forEach(x => this._player?.removeRemoteTextTrack(app.unsafe(x)));
    this._worker?.dispose();
    delete this._worker;
  }

  private onCreate(element: HTMLVideoElement | null) {
    if (!element || this._element) return;
    this._element = element;
    this._player = videojs(element, app.unsafe({autoplay: true, controlBar: false, fill: true, loadingSpinner: false}), () => {
      if (!this._player) return;
      app.Dispatcher.attach(this.props.bridge, this._player);
      this.props.bridge.subscribe(this);
      this.props.bridge.dispatchEvent({type: 'ready'});
    });
  }
}

const Styles = mui.createStyles({
  container: {
    height: '100vh'
  },
  containerHidden: {
    height: '100vh',
    '& $ui': {opacity: 0}
  },
  ui: {
    opacity: 1,
    transition: 'opacity 0.25s ease'
  }
});

export const MainView = mui.withStyles(Styles)(Component);
