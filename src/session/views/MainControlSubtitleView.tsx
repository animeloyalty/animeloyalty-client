import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class Component extends awe.shared.BaseComponent<typeof Styles, {vm: awm.MainControlSubtitleViewModel}> {
  state = {
    anchorEl: undefined,
  };

  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <mui.IconButton className={this.classes.iconButton} disabled={!this.props.vm.canSelect} onClick={(ev) => this.setState({anchorEl: ev.currentTarget})}>
          <awe.shared.icons.Subtitles />
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

  private renderMenuItem(subtitle?: awm.ISubtitle) {
    const displayName = subtitle
      ? subtitle.displayName
      : language.none;
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
    padding: 'max(1.2vmin, 6px)',
    '& svg': {fontSize: 'max(3vmin, 15px)'}
  },
  menu: {
    transform: 'translateX(max(5.6vmin, 26px))'
  },
  menuList: {
    padding: 'max(1.2vmin, 6px) 0'
  },
  menuListItem: {
    '& svg': {height: 'max(2vmin, 10px)', width: 'max(2vmin, 10px)'},
    '& .MuiFormControlLabel-label': {fontSize: 'max(2vmin, 10px)'},
    '& .MuiRadio-root': {padding: 'max(1.2vmin, 6px)'}
  }
});

export const MainControlSubtitleView = mui.withStyles(Styles)(Component);
