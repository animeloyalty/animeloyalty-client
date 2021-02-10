import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import videojs from 'video.js';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {bridge: app.Bridge, vm: app.MainViewModel}> implements app.IVideoHandler {
  private element?: HTMLVideoElement;
  private player?: videojs.Player;
  private worker?: SubtitlesOctopus;

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }
  
  componentWillUnmount() {
    super.componentWillUnmount();
    document.body.style.removeProperty('overflow');
    this.onDestroy();
  }

  onVideoRequest(request: app.VideoRequest) {
    switch (request.type) {
      case 'clearSubtitle':
        this.clearSubtitle();
        break;
      case 'loadSource':
        this.player?.src(request.source.urls.map(x => ({src: x, type: 'application/x-mpegURL'})));
        break;
      case 'loadSubtitle':
        this.clearSubtitle();
        if (request.subtitle.type === 'vtt') this.player?.addRemoteTextTrack({mode: 'showing', src: request.subtitle.url}, true);
        else this.worker = new SubtitlesOctopus({video: this.element, subUrl: request.subtitle.url, workerUrl: 'subtitles-octopus-4.0.0/subtitles-octopus-worker.js'});
        break;
      case 'pause':
        this.player?.pause();
        break;
      case 'play':
        this.player?.play();
        break;
      case 'seek':
        this.player?.currentTime(request.time);
        break;
    }
  }

  render() {
    return (
      <mui.Grid className={this.props.vm.isHidden ? this.classes.containerHidden : this.classes.container}>
        <video className="video-js" ref={(el) => this.onCreate(el)} onClick={() => this.props.vm.onVideoClick()} />
        <app.LoaderView open={this.props.vm.isWaiting} />
        <app.MainControlView className={this.classes.ui} vm={this.props.vm.control} />
      </mui.Grid>
    );
  }

  private clearSubtitle() {
    Array.from(this.player?.remoteTextTracks() ?? []).forEach(x => this.player?.removeRemoteTextTrack(app.api.unsafe(x)));
    this.worker?.dispose();
    delete this.worker;
  }

  private onCreate(element: HTMLVideoElement | null) {
    if (!element || this.element) return;
    this.element = element;
    this.player = videojs(element, app.api.unsafe({autoplay: true, controlBar: false, fill: true, loadingSpinner: false}), () => {
      if (!this.player) return;
      app.Dispatcher.attach(this.props.bridge, this.player);
      this.props.bridge.subscribe(this);
      this.props.bridge.dispatchEvent({type: 'create'});
    });
  }

  private onDestroy() {
    this.props.bridge.unsubscribe(this);
    this.player?.dispose()
    this.worker?.dispose();
  }
}

const Styles = mui.createStyles({
  container: {
    height: '100vh'
  },
  containerHidden: {
    cursor: 'none',
    height: '100vh',
    '& $ui': {opacity: 0, pointerEvents: 'none'}
  },
  ui: {
    opacity: 1,
    transition: 'opacity 0.25s ease'
  }
});

export const MainView = mui.withStyles(Styles)(View);
