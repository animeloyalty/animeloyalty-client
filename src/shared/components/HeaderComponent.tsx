import * as app from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

export class HeaderComponent extends app.BaseComponent<typeof HeaderComponentStyles, {title: string}> {
  render() {
    return (
      <mui.Grid>
        <mui.AppBar className="ios-inset-top">
          <mui.Toolbar>
            <mui.Typography color="inherit" variant="h6" className={this.classes.title}>
              {this.props.title}
            </mui.Typography>
          </mui.Toolbar>
        </mui.AppBar>
        <mui.Grid className="ios-inset-top ios-inset-bottom">
          <mui.Grid className={this.classes.childrenContainer}>
            {this.props.children}
          </mui.Grid>
        </mui.Grid>
      </mui.Grid>
    );
  }
}

export const HeaderComponentStyles = mui.createStyles({
  title: {
    flex: 1
  },
  childrenContainer: {
    paddingTop: 64
  }
});
