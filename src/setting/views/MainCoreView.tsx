import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainCoreViewModel}> {
  render() {
    return (
      <mui.Grid>
        <mui.Typography className={this.classes.sectionHeader}>
          {language.core}
        </mui.Typography>
        <mui.Grid className={this.classes.sectionContainer}>
          <mui.Typography>
            {language.coreProxyServerLabel}
          </mui.Typography>
          <mui.InputBase error={this.props.vm.hasError} fullWidth
            onChange={(ev) => this.props.vm.changeProxyServer(ev.currentTarget.value)}
            placeholder={language.coreProxyServerPlaceholder}
            value={this.props.vm.proxyServer} />
          <mui.FormControlLabel label={language.coreChromeHeadless} control={<mui.Switch color="primary"
            onClick={() => this.props.vm.toggleChromeHeadless()}
            checked={this.props.vm.chromeHeadless} />} />
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  sectionHeader: {
    color: app.theme.palette.primary.main,
    padding: app.sz(8)
  },
  sectionContainer: {
    padding: app.sz(8),
    paddingBottom: 0
  }
});

export const MainCoreView = mui.withStyles(Styles)(View);
