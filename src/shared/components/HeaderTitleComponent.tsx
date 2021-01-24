import * as app from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

class Component extends app.BaseComponent<typeof Styles, {title: string}> {
  render() {
    return (
      <mui.Grid>
        <mui.AppBar>
          <mui.Toolbar className={this.classes.toolBar}>
            <mui.IconButton className={this.classes.iconButton} onClick={() => app.core.view.leave()}>
              <app.icons.ArrowBackIos />
            </mui.IconButton>
            <mui.Typography className={this.classes.title}>
              {this.props.title}
            </mui.Typography>
          </mui.Toolbar>
        </mui.AppBar>
        <mui.Grid className={this.classes.children}>
          {this.props.children}
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  toolBar: {
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
    fontSize: app.sz(15),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  children: {
    paddingTop: app.sz(30)
  }
});

export const HeaderTitleComponent = mui.withStyles(Styles)(Component);
