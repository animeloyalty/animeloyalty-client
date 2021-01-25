import LazyLoad from 'react-lazyload';
import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.SeriesSeasonEpisodeViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container} onClick={() => this.props.vm.open()}>
        <LazyLoad once resize>
          <mui.Grid className={this.classes.imageContainer}>
            <img className={this.classes.image} src={this.props.vm.imageUrl} onLoad={(ev) => ev.currentTarget.style.opacity = '1'} />
            </mui.Grid>
        </LazyLoad>
        <mui.Typography className={this.classes.textContent}>
          {this.props.vm.displayName}
        </mui.Typography>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    cursor: 'pointer',
    height: '8vw',
    padding: app.sz(5),
    transition: 'padding 0.25s ease',
    '&:hover': {padding: 0},
    '&:hover $imageContainer': {borderColor: app.theme.palette.secondary.main},
    '&:hover $textContent': {padding: `0 ${app.sz(5)}`},
    '& .lazyload-wrapper': {height: '100%'}
  },
  imageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: `${app.sz(2)} solid ${app.theme.palette.primary.main}`,
    borderRadius: app.sz(12),
    height: '100%'
  },
  image: {
    borderRadius: app.sz(10),
    objectFit: 'cover',
    opacity: 0,
    height: '100%',
    transition: 'opacity 0.25s ease',
    width: '100%'
  },
  textContent: {
    fontSize: app.sz(10),
    textAlign: 'center',
    transition: 'padding 0.25s ease',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const SeriesSeasonEpisodeView = mui.withStyles(Styles)(Component);
