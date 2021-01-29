import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.SeriesSeasonViewModel}> {
  render() {
    return (
      <mui.Grid>
        <mui.Typography className={this.classes.title}>
          {this.props.vm.title}
        </mui.Typography>
        <mui.Paper className={this.props.vm.hasEpisodes ? this.classes.episodeContainer : this.classes.emptyContainer} square={true}>
          {this.props.vm.hasEpisodes
            ? this.props.vm.episodes.map((vm, i) => <app.SeriesSeasonEpisodeView key={i} vm={vm} />)
            : <mui.Typography className={this.classes.title}>{language.seriesSeason}</mui.Typography>}
        </mui.Paper>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  title: {
    fontSize: app.sz(12),
    padding: app.sz(8)
  },
  episodeContainer: {
    display: 'grid',
    gridGap: '1vw',
    gridTemplateColumns: 'repeat(auto-fill, calc((100% - 6vw) / 7))',
    justifyContent: 'center',
    padding: '1vw',
    width: '100%'
  },
  emptyContainer: {
    fontSize: app.sz(12),
    padding: app.sz(8)
  }
});

export const SeriesSeasonView = mui.withStyles(Styles)(View);
