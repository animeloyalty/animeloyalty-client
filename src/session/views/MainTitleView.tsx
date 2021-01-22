import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends awe.shared.BaseComponent<typeof Styles, {vm: awm.MainTitleViewModel}> {
  render() {
    return (
      <mui.AppBar className={this.classes.appBar}>
        <mui.Toolbar className={this.classes.toolBar}>
          <mui.IconButton className={this.classes.iconButton} onClick={() => this.props.vm.leave()}>
            <awe.shared.icons.ArrowBackIos />
          </mui.IconButton>
          <mui.Grid className={this.classes.title}>
            <mui.Typography className={this.classes.titleTop}>
              {this.props.vm.displayName}
            </mui.Typography>
            <mui.Typography className={this.classes.titleBottom}>
              {this.props.vm.seriesName} ● {this.props.vm.seasonName}
            </mui.Typography>
          </mui.Grid>
        </mui.Toolbar>
      </mui.AppBar>
    );
  }
}

const Styles = mui.createStyles({
  appBar: {
    backgroundColor: 'transparent'
  },
  toolBar: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    height: 'max(6vmin, 30px)',
    minHeight: 0,
    paddingLeft: 0
  },
  iconButton: {
    padding: 'max(1.2vmin, 6px)',
    paddingLeft: 'max(2vmin, 10px)',
    paddingRight: 'max(0.8vmin, 4px)',
    '& svg': {fontSize: 'max(3vmin, 15px)'}
  },
  title: {
    flex: 1,
    width: 0
  },
  titleTop: {
    fontSize: 'max(2vmin, 10px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  titleBottom: {
    color: '#AAA',
    fontSize: 'max(2vmin, 10px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const MainTitleView = mui.withStyles(Styles)(Component);
