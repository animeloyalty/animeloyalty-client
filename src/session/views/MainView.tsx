import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import videojs from 'video.js';

@mobxReact.observer
class Component extends awe.shared.BaseComponent<typeof Styles, {bridge: awm.Bridge, vm: awm.MainViewModel}> {
  private _element?: HTMLVideoElement;
  private _player?: videojs.Player;
  private _worker?: SubtitlesOctopus;

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }
  
  componentWillUnmount() {
    document.body.style.removeProperty('overflow');
    this._player?.dispose()
    this._worker?.dispose();
  }

  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <video className="video-js" ref={(el) => this._onCreate(el)} />
        <awe.shared.LoaderComponent open={this.props.vm.isWaiting} />
        <awm.MainControlView vm={this.props.vm.control} />
        <awm.MainTitleView />
      </mui.Grid>
    );
  }

  private _onCreate(element: HTMLVideoElement | null) {
    if (!element || this._element) return;
    this._element = element;
    this._player = videojs(element, {autoplay: true, controlBar: false, fill: true, loadingSpinner: false}, () => {
      if (!this._player) return;
      new awm.Distributor(this.props.bridge, this._player).attach();
      this.props.bridge.addRequestHandler(this._onRequest.bind(this));
      this.props.bridge.dispatchEvent({type: 'ready'});
    });
  }

  private _onRequest(command: awm.VideoRequest) {
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
}

const Styles = mui.createStyles({
  container: {
    height: '100vh'
  }
});

export const MainView = mui.withStyles(Styles)(Component);
