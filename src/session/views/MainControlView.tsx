import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseInputComponent<typeof Styles, {className?: string, vm: app.MainControlViewModel}> {
  render() {
    return (
      <mui.Grid className={this.props.className}>
        <app.HeaderTitleComponent className={this.classes.appBar}
          primary={this.props.vm.titlePrimary}
          secondary={this.props.vm.titleSecondary} />
        <mui.AppBar className={this.classes.container}>
          {this.props.vm.isLoaded && <mui.Grid>
            <app.SliderComponent className={this.classes.seekBar} color="secondary"
              buffered={this.props.vm.currentBuffer} value={this.props.vm.currentTime} max={this.props.vm.currentDuration}
              onChange={app.unsafe((_: never, x: number) => this.props.vm.seekStart(x))}
              onChangeCommitted={app.unsafe((_: never, x: number) => this.props.vm.seekStop(x))} />
            <mui.Grid className={this.classes.beginBar}>
              <mui.Typography className={this.classes.beginBarText}>
                {app.formatTime(this.props.vm.currentTime)} / {app.formatTime(this.props.vm.currentDuration)}
              </mui.Typography>
            </mui.Grid>
          </mui.Grid>}
          <mui.Grid className={this.classes.centerBar}>
            <mui.IconButton className={this.classes.iconButton}
              disabled={!this.props.vm.hasPrevious}
              onClick={() => this.props.vm.openPrevious()}>
              <app.icons.SkipPrevious />
            </mui.IconButton>
            <mui.IconButton className={this.classes.iconButton}
              disabled={!this.props.vm.isLoaded}
              onClick={() => this.props.vm.seekBackward()}>
              <app.icons.FastRewind />
            </mui.IconButton>
            <mui.IconButton className={this.classes.iconButton}
              disabled={!this.props.vm.isLoaded}
              onClick={() => this.props.vm.togglePlay()}>
              {this.props.vm.isPlaying
                ? <app.icons.Pause />
                : <app.icons.PlayArrow />}
            </mui.IconButton>
            <mui.IconButton className={this.classes.iconButton}
              disabled={!this.props.vm.isLoaded}
              onClick={() => this.props.vm.seekForward()}>
              <app.icons.FastForward />
            </mui.IconButton>
            <mui.IconButton className={this.classes.iconButton}
              disabled={!this.props.vm.hasNext}
              onClick={() => this.props.vm.openNext()}>
              <app.icons.SkipNext />
            </mui.IconButton>
          </mui.Grid>
          <mui.Grid className={this.classes.endBar}>
            <app.MainControlSubtitleView vm={this.props.vm.subtitle} />
            <mui.IconButton className={this.classes.iconButton}
              onClick={() => app.core.screen.toggleFullscreen()}>
              {app.core.screen.isFullscreen
                ? <app.icons.FullscreenExit />
                : <app.icons.Fullscreen />}
            </mui.IconButton>
          </mui.Grid>
        </mui.AppBar>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  appBar: {
    backgroundColor: 'transparent'
  },
  container: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    height: app.sz(30),
    position: 'absolute',
    bottom: 0,
    top: 'inherit'
  },
  seekBar: {
    padding: `${app.sz(5)} 0`,
    position: 'absolute',
    top: 0,
    transform: 'translateY(-50%)'
  },
  beginBar: {
    position: 'absolute',
    left: app.sz(10),
    top: '50%',
    transform: 'translateY(-50%)'
  },
  beginBarText: {
    fontSize: app.sz(10)
  },
  centerBar: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  endBar: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  iconButton: {
    padding: app.sz(5),
    '& svg': {fontSize: app.sz(15)}
  }
});

export const MainControlView = mui.withStyles(Styles)(Component);
