import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends awe.shared.BaseInputComponent<typeof Styles, {vm: awm.MainControlViewModel}> {
  render() {
    const isFullScreen = false;
    return (
      <mui.AppBar className={this.classes.container}>
        {this.props.vm.canSeek && <mui.Grid>
          <awm.MainControlSeekView vm={this.props.vm.seek} />
          <mui.Grid className={this.classes.beginBar}>
            <mui.Typography className={this.classes.time}>
              {awe.shared.formatTime(this.props.vm.currentTime)} /
              {awe.shared.formatTime(this.props.vm.currentDuration)}
            </mui.Typography>
          </mui.Grid>
        </mui.Grid>}
        <mui.Grid className={this.classes.centerBar}>
          <mui.IconButton className={this.classes.iconButton} disabled={!this.props.vm.hasPrevious} onClick={() => this.props.vm.openPrevious()}>
            <awe.shared.icons.SkipPrevious />
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton} disabled={!this.props.vm.canSeek} onClick={() => this.props.vm.seekRewind()}>
            <awe.shared.icons.FastRewind />
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton} disabled={!this.props.vm.canSeek} onClick={() => this.props.vm.togglePlay()}>
            {this.props.vm.isPlaying ? <awe.shared.icons.Pause /> : <awe.shared.icons.PlayArrow />}
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton} disabled={!this.props.vm.canSeek} onClick={() => this.props.vm.seekForward()}>
            <awe.shared.icons.FastForward />
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton} disabled={!this.props.vm.hasNext} onClick={() => this.props.vm.openNext()}>
            <awe.shared.icons.SkipNext />
          </mui.IconButton>
        </mui.Grid>
        <mui.Grid className={this.classes.endBar}>
          <awm.MainControlSubtitleView vm={this.props.vm.subtitle} />
          <mui.IconButton className={this.classes.iconButton}>
            {isFullScreen ? <awe.shared.icons.FullscreenExit /> : <awe.shared.icons.Fullscreen />}
          </mui.IconButton>
        </mui.Grid>
      </mui.AppBar>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    height: 'max(6vmin, 30px)',
    position: 'absolute',
    bottom: 0,
    top: 'inherit'
  },
  beginBar: {
    position: 'absolute',
    left: 'max(1.8vmin, 9px)',
    top: '50%',
    transform: 'translateY(-50%)'
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
    padding: 'max(1.2vmin, 6px)',
    '& svg': {fontSize: 'max(3vmin, 15px)'}
  },
  time: {
    fontSize: 'max(2vmin, 10px)',
  }
});

export const MainControlView = mui.withStyles(Styles)(Component);
