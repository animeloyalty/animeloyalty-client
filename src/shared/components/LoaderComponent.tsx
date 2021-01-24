import * as app from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

class Component extends app.BaseComponent<typeof Styles, {open: boolean}> { 
  render() {
    return this.props.open && <mui.CircularProgress className={this.classes.icon} color="secondary" />;
  }
}

const Styles = mui.createStyles({
  icon: {
    animation: 'none',
    height: `${app.sz(30)} !important`,
    width: `${app.sz(30)} !important`,
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

export const LoaderComponent = mui.withStyles(Styles)(Component);
