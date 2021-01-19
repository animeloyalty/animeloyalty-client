import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles> {
  render() {
    const isPlaying = true;
    const isFullScreen = false;
    return (
      <mui.AppBar className={this.classes.container}>
        <app.StreamFooterSeekView />
        <mui.Grid className={this.classes.beginBar}>
          <mui.Typography className={this.classes.time}>
            03:23 / 23:24
          </mui.Typography>
        </mui.Grid>
        <mui.Grid className={this.classes.centerBar}>
          <mui.IconButton className={this.classes.iconButton}>
            <app.icons.SkipPrevious />
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton}>
            <app.icons.FastRewind />
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton}>
            {isPlaying
              ? <app.icons.Pause />
              : <app.icons.PlayArrow />}
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton}>
            <app.icons.FastForward />
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton}>
            <app.icons.SkipNext />
          </mui.IconButton>
        </mui.Grid>
        <mui.Grid className={this.classes.endBar}>
          <mui.IconButton className={this.classes.iconButton}>
            <app.icons.PlaylistPlay />
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton}>
            <app.icons.Subtitles />
          </mui.IconButton>
          <mui.IconButton className={this.classes.iconButton}>
            {isFullScreen
              ? <app.icons.FullscreenExit />
              : <app.icons.Fullscreen />}
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

export const StreamFooterView = mui.withStyles(Styles)(Component);
