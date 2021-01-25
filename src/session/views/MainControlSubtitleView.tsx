import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.MainControlSubtitleViewModel}> {
  state = {
    anchorEl: undefined,
  };

  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <mui.IconButton className={this.classes.iconButton} disabled={!this.props.vm.canSelect} onClick={(ev) => this.setState({anchorEl: ev.currentTarget})}>
          <app.icons.Subtitles />
        </mui.IconButton>
        <mui.Popper anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} disablePortal placement="top-end">
          <mui.Paper className={this.classes.menu}>
            <mui.ClickAwayListener onClickAway={() => this.setState({anchorEl: undefined})}>
              <mui.MenuList className={this.classes.menuList} onClick={() => this.setState({anchorEl: undefined})}>
                {this.renderMenuItem()}
                <mui.Divider />
                {this.props.vm.subtitles.map((subtitle) => this.renderMenuItem(subtitle))}
              </mui.MenuList>
            </mui.ClickAwayListener>
          </mui.Paper>
        </mui.Popper>
      </mui.Grid>
    );
  }

  private renderMenuItem(subtitle?: app.ISubtitle) {
    const displayName = subtitle
      ? subtitle.displayName
      : language.subtitle;
    const isChecked = subtitle
      ? this.props.vm.selectedSubtitle === subtitle
      : this.props.vm.selectedSubtitle == null;
    const onClick = subtitle
      ? () => this.props.vm.select(subtitle)
      : () => this.props.vm.clear();
    return (
      <mui.MenuItem className={this.classes.menuListItem} key={displayName} onClick={onClick}>
        <mui.FormControlLabel control={<mui.Radio checked={isChecked} />} label={displayName} />
      </mui.MenuItem>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    display: 'inline-block'
  },
  iconButton: {
    padding: app.sz(5),
    '& svg': {fontSize: app.sz(15)}
  },
  menu: {
    transform: `translateX(${app.sz(28)})`
  },
  menuList: {
    padding: `${app.sz(5)} 0`
  },
  menuListItem: {
    '& svg': {height: app.sz(10), width: app.sz(10)},
    '& .MuiFormControlLabel-label': {fontSize: app.sz(10)},
    '& .MuiRadio-root': {padding: app.sz(5)}
  }
});

export const MainControlSubtitleView = mui.withStyles(Styles)(Component);
