import * as app from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

class Component extends app.BaseComponent<typeof Styles, {icon?: React.ReactElement<any>, title: string}> {
  render() {
    return (
      <mui.Grid>
        <mui.AppBar className="disablePadding">
          <mui.Grid className="inset-top">
            <mui.Toolbar>
              <mui.IconButton className={this.classes.back} color="inherit" onClick={() => app.core.screen.leave()}>
                <app.icons.ArrowBackIos />
              </mui.IconButton>
              <mui.Typography className={this.classes.title} color="inherit" variant="h6">
                {this.props.title}
              </mui.Typography>
              <mui.Grid className={this.classes.menu}>
                {this.props.icon}
              </mui.Grid>
            </mui.Toolbar>
          </mui.Grid>
        </mui.AppBar>
        <mui.Grid className="inset-top">
          <mui.Grid className={this.classes.children}>
            {this.props.children}
          </mui.Grid>
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  children: {
    paddingTop: 64
  },
  back: {
    marginLeft: -24,
    paddingLeft: 16,
    paddingRight: 6
  },
  title: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  menu: {
    marginRight: -20
  }
});

export const HeaderTitleComponent = mui.withStyles(Styles)(Component);
