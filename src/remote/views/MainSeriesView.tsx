import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.MainSeriesViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container} onClick={() => this.props.vm.openAsync()}>
        <img className={this.classes.image} src={this.props.vm.imageUrl} />
        <mui.Typography className={this.classes.textContent}>{this.props.vm.title}</mui.Typography>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    cursor: 'pointer',
    height: '22vw'
  },
  image: {
    objectFit: 'cover',
    height: 'calc(100% - 2vw)',
    width: '100%'
  },
  textContent: {
    fontSize: '1.25vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const MainSeriesView = mui.withStyles(Styles)(Component);
