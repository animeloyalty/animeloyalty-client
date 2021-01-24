import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.SeriesSeasonEpisodeViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container} onClick={() => this.props.vm.open()}>
        <img className={this.classes.image} src={this.props.vm.imageUrl} />
        <mui.Typography className={this.classes.textContent}>{this.props.vm.displayName}</mui.Typography>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    cursor: 'pointer',
    height: '10vw',
    padding: '0.75vw',
    transition: 'padding 0.25s ease',
    '&:hover': {padding: 0},
    '&:hover $image': {borderColor: app.theme.palette.secondary.main},
    '&:hover $textContent': {padding: '0 0.75vw'}
  },
  image: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '0.25vw solid transparent',
    borderRadius: '1vw',
    objectFit: 'cover',
    height: 'calc(100% - 2vw)',
    width: '100%'
  },
  textContent: {
    fontSize: '1.25vw',
    textAlign: 'center',
    transition: 'padding 0.25s ease',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const SeriesSeasonEpisodeView = mui.withStyles(Styles)(Component);
