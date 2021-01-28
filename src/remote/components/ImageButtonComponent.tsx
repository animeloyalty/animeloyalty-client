import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {height: string, imageUrl: string, text: string, onClick: () => void}> {
  render() {
    return (
      <mui.Grid className={this.classes.container} onClick={this.props.onClick}>
        <mui.Grid className={this.classes.growContainer} style={{height: this.props.height}}>
          <mui.Grid className={this.classes.borderContainer}>
            <app.ImageComponent imageUrl={this.props.imageUrl}>
              {this.props.children}
            </app.ImageComponent>
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
    '&:hover $growContainer': {padding: 0},
    '&:hover $borderContainer': {borderColor: app.theme.palette.primary.main},
    '& .lazyload-wrapper': {height: '100%'}
  },
  growContainer: {
    padding: app.sz(4),
    transition: 'padding 0.25s ease',
  },
  borderContainer: {
    border: `${app.sz(2)} solid transparent`,
    borderRadius: app.sz(14),
    height: '100%'
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
