import * as app from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

class Component extends app.BaseComponent<typeof Styles, {className?: string, primary?: string, secondary?: string}> {
  render() {
    return (
      <mui.Grid>
        <mui.AppBar className={this.props.className}>
          <mui.Toolbar className={this.classes.toolBar}>
            <mui.IconButton className={this.classes.iconButton} onClick={() => app.core.view.leave()}>
              <app.icons.ArrowBackIos />
            </mui.IconButton>
            <mui.Grid className={this.classes.title}>
              {this.props.primary && <mui.Typography className={this.classes.titleText}>
                {this.props.primary}
              </mui.Typography>}
              {this.props.secondary && <mui.Typography className={this.classes.titleText} color="textSecondary">
                {this.props.secondary}
              </mui.Typography>}
            </mui.Grid>
          </mui.Toolbar>
        </mui.AppBar>
        {this.classes.children && <mui.Grid className={this.classes.children}>
          {this.props.children}
        </mui.Grid>}
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  toolBar: {
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    height: app.sz(32),
    minHeight: 0,
    padding: 0
  },
  iconButton: {
    marginRight: app.sz(2),
    padding: app.sz(8),
    paddingLeft: app.sz(12),
    paddingRight: app.sz(5),
    '& svg': {fontSize: app.sz(15)}
  },
  title: {
    flex: 1,
    width: 0
  },
  titleText: {
    fontSize: app.sz(12),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  children: {
    paddingTop: app.sz(32)
  }
});

export const HeaderComponent = mui.withStyles(Styles)(Component);
