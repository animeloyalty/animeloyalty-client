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
              {this.props.primary && <mui.Typography className={this.classes.titlePrimary}>
                {this.props.primary}
              </mui.Typography>}
              {this.props.secondary && <mui.Typography className={this.classes.titleSecondary}>
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
  titlePrimary: {
    fontSize: app.sz(10),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  titleSecondary: {
    color: '#AAA',
    fontSize: app.sz(10),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  children: {
    paddingTop: app.sz(30)
  }
});

export const HeaderTitleComponent = mui.withStyles(Styles)(Component);
