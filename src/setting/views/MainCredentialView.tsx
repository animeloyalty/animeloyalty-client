import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainCredentialViewModel}> {
  render() {
    return (
      <mui.Grid>
        <mui.Typography className={this.classes.sectionHeader}>
          {language.credential}
        </mui.Typography>
        <mui.Grid className={this.classes.sectionContainer}>
          <mui.Typography>
            {language.credentialCrunchyroll}
          </mui.Typography>
          <mui.InputBase className={this.classes.inputLeft}
            onChange={(ev) => this.props.vm.changeCrunchyrollUsername(ev.currentTarget.value)}
            placeholder={language.credentialUsername}
            value={this.props.vm.crunchyrollUsername} />
          <mui.InputBase className={this.classes.inputRight}
            onChange={(ev) => this.props.vm.changeCrunchyrollPassword(ev.currentTarget.value)}
            placeholder={language.credentialPassword}
            value={this.props.vm.crunchyrollPassword}
            type="password" />
          <mui.Typography>
            {language.credentialFunimation}
          </mui.Typography>
          <mui.InputBase className={this.classes.inputLeft}
            onChange={(ev) => this.props.vm.changeFunimationUsername(ev.currentTarget.value)}
            placeholder={language.credentialUsername}
            value={this.props.vm.funimationUsername} />
          <mui.InputBase className={this.classes.inputRight}
            onChange={(ev) => this.props.vm.changeFunimationPassword(ev.currentTarget.value)}
            placeholder={language.credentialPassword}
            value={this.props.vm.funimationPassword}
            type="password" />
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
  },
  inputLeft: {
    marginBottom: app.sz(8),
    marginRight: app.sz(4),
    width: `calc(50% - ${app.sz(4)})`
  },
  inputRight: {
    marginBottom: app.sz(8),
    marginLeft: app.sz(4),
    width: `calc(50% - ${app.sz(4)})`
  }
});

export const MainCredentialView = mui.withStyles(Styles)(View);
