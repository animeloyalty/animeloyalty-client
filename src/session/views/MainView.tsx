import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import videojs from 'video.js';

@mobxReact.observer
class Component extends awe.shared.BaseInputComponent<typeof Styles, {bridge: awm.Bridge, vm: awm.MainViewModel}> implements awm.IBridgeHandler {
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

  onVideoRequest(command: awm.VideoRequest) {
    switch (command.type) {
      case 'subtitle':
        if (command.subtitleType === 'vtt') {
          this._worker?.dispose();
          this._player?.addRemoteTextTrack({mode: 'showing', src: command.url}, true);
          break;
        } else {
          this._worker?.dispose();
          this._worker = new SubtitlesOctopus({video: this._element, subUrl: command.url, workerUrl: 'js/subtitles-octopus-worker.js'});
          break;
        }
    }
  }
  
  render() {
    return (
      <mui.Grid className={this.props.vm.isHidden ? this.classes.containerHidden : this.classes.container}>
        <video className="video-js" ref={(el) => this._onCreate(el)} onClick={() => this.props.vm.togglePlay()} />
        <awe.shared.LoaderComponent open={this.props.vm.isWaiting} />
        <mui.Grid className={this.classes.ui}>
          <awm.MainControlView vm={this.props.vm.control} />
          <awm.MainTitleView vm={this.props.vm.title} />
        </mui.Grid>
      </mui.Grid>
    );
  }

  private _onCreate(element: HTMLVideoElement | null) {
    if (!element || this._element) return;
    this._element = element;
    this._player = videojs(element, awe.shared.unsafe({autoplay: true, controlBar: false, fill: true, loadingSpinner: false}), () => {
      if (!this._player) return;
      awm.Distributor.createAttach(this.props.bridge, this._player);
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
