import LazyLoad from 'react-lazyload';
import * as app from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

class Component extends app.BaseComponent<typeof Styles, {imageUrl?: string}> {
  render() {
    return (
      <mui.Grid className={this.classes.imageContainer}>
        <LazyLoad once resize>
          <img className={this.classes.image} src={this.props.imageUrl} onLoad={(ev) => ev.currentTarget.style.opacity = '1'} />
        </LazyLoad>
        {this.props.children}
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  imageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: app.sz(12),
    height: '100%',
    position: 'relative'
  },
  image: {
    borderRadius: app.sz(12),
    objectFit: 'cover',
    opacity: 0,
    height: '100%',
    transition: 'opacity 0.25s ease',
    width: '100%'
  }
});

export const ImageComponent = mui.withStyles(Styles)(Component);
