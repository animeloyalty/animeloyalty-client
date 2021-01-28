import LazyLoad from 'react-lazyload';
import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {height: string, imageUrl: string, text: string, onClick: () => void}> {
  render() {
    return (
      <mui.Grid className={this.classes.container} onClick={this.props.onClick}>
        <mui.Grid className={this.classes.imageGrowContainer} style={{height: this.props.height}}>
          <mui.Grid className={this.classes.imageBorderContainer}>
            <mui.Grid className={this.classes.imageBackContainer}>
              <LazyLoad once resize>
                <img className={this.classes.image} src={this.props.imageUrl} onLoad={(ev) => ev.currentTarget.style.opacity = '1'} />
              </LazyLoad>
            </mui.Grid>
          </mui.Grid>
        </mui.Grid>
        <mui.Typography className={this.classes.textContent}>
          {this.props.text}
        </mui.Typography>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    cursor: 'pointer',
    '&:hover $imageGrowContainer': {padding: 0},
    '&:hover $imageBorderContainer': {borderColor: app.theme.palette.primary.main},
    '& .lazyload-wrapper': {height: '100%'}
  },
  imageGrowContainer: {
    padding: app.sz(4),
    transition: 'padding 0.25s ease',
  },
  imageBorderContainer: {
    border: `${app.sz(2)} solid transparent`,
    borderRadius: app.sz(14),
    height: '100%'
  },
  imageBackContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: app.sz(12),
    height: '100%'
  },
  image: {
    borderRadius: app.sz(12),
    objectFit: 'cover',
    opacity: 0,
    height: '100%',
    transition: 'opacity 0.25s ease',
    width: '100%'
  },
  textContent: {
    fontSize: app.sz(12),
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const ImageButtonComponent = mui.withStyles(Styles)(Component);
