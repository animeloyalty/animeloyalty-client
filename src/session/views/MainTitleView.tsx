import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.MainTitleViewModel}> {
  render() {
    return (
      <mui.AppBar className={this.classes.appBar}>
        <mui.Toolbar className={this.classes.toolBar}>
          <mui.IconButton className={this.classes.iconButton} onClick={() => app.core.view.leave()}>
            <app.icons.ArrowBackIos />
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
    height: app.sz(30),
    minHeight: 0,
    paddingLeft: 0
  },
  iconButton: {
    padding: app.sz(6),
    paddingLeft: app.sz(10),
    paddingRight: app.sz(4),
    '& svg': {fontSize: app.sz(15)}
  },
  title: {
    flex: 1,
    width: 0
  },
  titleTop: {
    fontSize: app.sz(10),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  titleBottom: {
    color: '#AAA',
    fontSize: app.sz(10),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const MainTitleView = mui.withStyles(Styles)(Component);
