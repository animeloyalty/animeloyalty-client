import * as app from '..';
import * as mui from '@material-ui/core';

class Component extends app.BaseComponent<typeof Styles, {onMount: () => void}> {
  componentDidMount() {
    this.props.onMount();
  }
  
  render() {
    return false;
  }
}

const Styles = mui.createStyles({
});

export const MountComponent = mui.withStyles(Styles)(Component);
