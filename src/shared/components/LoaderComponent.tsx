import * as app from '..';
import * as mui from '@material-ui/core';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {open?: boolean, quiet?: boolean, vm?: app.LoaderViewModel}> { 
  render() {
    if (!this.props.open && !this.props.vm?.isLoading) {
      return false;
    } else if (!this.props.quiet && !this.props.vm?.isQuiet) {
      return <mui.CircularProgress className={this.classes.circular} color="secondary" />;
    } else {
      return <mui.LinearProgress className={this.classes.linear} color="secondary" />;
    }
  }
}

const Styles = mui.createStyles({
  circular: {
    animation: 'none',
    height: `${app.sz(30)} !important`,
    width: `${app.sz(30)} !important`,
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  linear: {
    height: app.sz(2),
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
});

export const LoaderComponent = mui.withStyles(Styles)(Component);
