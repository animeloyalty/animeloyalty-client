import * as app from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

export class Component extends app.BaseComponent<typeof Styles, {className?: string, disabled?: boolean, children: React.ReactNodeArray, placement: mui.PopperPlacementType}> {
  state = {
    anchorEl: undefined,
  };

  render() {
    return (
      <mui.Grid>
        {this.props.disabled
          ? <mui.Grid>{this.props.children[0]}</mui.Grid>
          : <mui.Grid onClick={(ev) => this.setState({anchorEl: ev.currentTarget})}>{this.props.children[0]}</mui.Grid>}
        <mui.Popper anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} disablePortal placement={this.props.placement}>
          <mui.Paper className={this.props.className} elevation={0} square={true}>
            <mui.ClickAwayListener onClickAway={() => this.setState({anchorEl: undefined})}>
              <mui.MenuList disablePadding onClick={() => this.setState({anchorEl: undefined})}>
                {this.props.children.slice(1)}
              </mui.MenuList>
            </mui.ClickAwayListener>
          </mui.Paper>
        </mui.Popper>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
});

export const MenuComponent = mui.withStyles(Styles)(Component);
