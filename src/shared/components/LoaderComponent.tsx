import * as app from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

class Component extends app.BaseComponent<typeof Styles> {
  state = {
    open: false, 
    timeoutHandle: undefined
  };

  componentDidMount() {
    setTimeout(() => this.setState({open: true}));
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutHandle);
  }

  render() {
    return this.state.open
      ? <mui.CircularProgress className={this.classes.icon} color="secondary" />
      : null;
  }
}

const Styles = mui.createStyles({
  icon: {
    animation: 'none',
    left: '50%',
    position: 'fixed',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

export const LoaderComponent = mui.withStyles(Styles)(Component);
