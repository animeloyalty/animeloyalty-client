import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainControlSubtitleViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <app.MenuComponent className={this.classes.menu} disabled={!this.props.vm.canSelect} placement="bottom-end">
          <mui.IconButton disabled={!this.props.vm.canSelect}>
            <app.icons.Subtitles />
          </mui.IconButton>
          <mui.Grid>
            {this.menuItem(0)}
            <mui.Divider />
            {this.props.vm.subtitles.map((subtitle, i) => this.menuItem(i + 1, subtitle))}
          </mui.Grid>
        </app.MenuComponent>
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
      <mui.MenuItem key={i} onClick={onClick}>
        <mui.FormControlLabel control={<mui.Radio checked={isChecked} color="primary" />} label={displayName} />
      </mui.MenuItem>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    display: 'inline-block'
  },
  menu: {
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    transform: `translateX(${app.sz(32)})`
  }
});

export const MainControlSubtitleView = mui.withStyles(Styles)(View);
