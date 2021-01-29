import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.SeriesSeasonEpisodeViewModel}> {
  render() {
    return (
      <app.ImageButtonComponent height="8vw" onClick={() => this.props.vm.open()}
        imageUrl={this.props.vm.imageUrl}
        text={this.props.vm.displayName}>
        {this.props.vm.isPremium && <mui.Grid className={this.classes.container}>
          <mui.Typography className={this.classes.premium} color="textSecondary">
            {language.seriesPremium}
          </mui.Typography>
        </mui.Grid>}
      </app.ImageButtonComponent>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    backgroundColor: app.theme.palette.secondary.main,
    borderBottomLeftRadius: app.sz(12),
    borderBottomRightRadius: app.sz(12),
    padding: app.sz(1),
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  premium: {
    fontSize: app.sz(10),
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
});

export const SeriesSeasonEpisodeView = mui.withStyles(Styles)(Component);
