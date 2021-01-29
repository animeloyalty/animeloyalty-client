import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainControlSubtitleViewModel}> {
  state = {
    anchorEl: undefined,
  };

  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <mui.IconButton className={this.classes.iconButton}
          disabled={!this.props.vm.canSelect}
          onClick={(ev) => this.setState({anchorEl: ev.currentTarget})}>
          <app.icons.Subtitles />
        </mui.IconButton>
        <mui.Popper anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} disablePortal placement="bottom-end">
          <mui.Paper className={this.classes.menu} elevation={0} square={true}>
            <mui.ClickAwayListener onClickAway={() => this.setState({anchorEl: undefined})}>
              <mui.MenuList className={this.classes.menuList} onClick={() => this.setState({anchorEl: undefined})}>
                {this.menuItem(0)}
                <mui.Divider />
                {this.props.vm.subtitles.map((subtitle, i) => this.menuItem(i + 1, subtitle))}
              </mui.MenuList>
            </mui.ClickAwayListener>
          </mui.Paper>
        </mui.Popper>
      </mui.Grid>
    );
  }

  private menuItem(i: number, subtitle?: app.ISubtitle) {
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
      <mui.MenuItem className={this.classes.menuListItem} key={i} onClick={onClick}>
        <mui.FormControlLabel control={<mui.Radio checked={isChecked} color="primary" />} label={displayName} />
      </mui.MenuItem>
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
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    transform: `translateX(${app.sz(32)})`
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

export const MainControlSubtitleView = mui.withStyles(Styles)(View);
