import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
export class MainSeriesView extends app.BaseComponent<typeof MainSeriesViewStyles, {vm: app.MainSeriesViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container} onClick={() => this.props.vm.openAsync()}>
        <img className={this.classes.image} src={this.props.vm.imageUrl} />
        <mui.Typography className={this.classes.textContent}>{this.props.vm.title}</mui.Typography>
      </mui.Grid>
    );
  }
}

export const MainSeriesViewStyles = mui.createStyles({
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
