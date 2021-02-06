import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainControlSourceViewModel}> {
  state = {
    anchorEl: undefined,
  };

  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <mui.IconButton className={this.classes.iconButton}
          disabled={!this.props.vm.canSelect}
          onClick={(ev) => this.setState({anchorEl: ev.currentTarget})}>
          <app.icons.PersonalVideo />
        </mui.IconButton>
        <mui.Popper anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} disablePortal placement="bottom-end">
          <mui.Paper className={this.classes.menu} elevation={0} square={true}>
            <mui.ClickAwayListener onClickAway={() => this.setState({anchorEl: undefined})}>
              <mui.MenuList className={this.classes.menuList} onClick={() => this.setState({anchorEl: undefined})}>
                {this.props.vm.sources.map((source, i) => (
                  <mui.MenuItem className={this.classes.menuListItem} key={i} onClick={() => this.props.vm.select(source)}>
                    <mui.FormControlLabel control={<mui.Radio checked={this.props.vm.selectedSource === source} color="primary" />} label={source.displayName} />
                  </mui.MenuItem>
                ))}
              </mui.MenuList>
            </mui.ClickAwayListener>
          </mui.Paper>
        </mui.Popper>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    display: 'inline-block'
  },
  iconButton: {
    padding: app.sz(8),
    '& svg': {fontSize: app.sz(15)}
  },
  menu: {
    backgroundColor: 'rgba(50, 50, 50, 0.5)'
  },
  menuList: {
    padding: 0,
  },
  menuListItem: {
    '& svg': {height: app.sz(12), width: app.sz(12)},
    '& .MuiFormControlLabel-label': {fontSize: app.sz(12)},
    '& .MuiRadio-root': {padding: app.sz(8)}
  }
});

export const MainControlSourceView = mui.withStyles(Styles)(View);
