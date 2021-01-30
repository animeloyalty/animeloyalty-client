import LazyLoad from 'react-lazyload';
import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.SeriesSeasonViewModel}> {
  render() {
    const height = this.calculateHeight(this.props.vm.episodes.length);
    return (
      <mui.Grid>
        <mui.Typography className={this.classes.title}>
          {this.props.vm.title}
        </mui.Typography>
        <LazyLoad height={height} resize unmountIfInvisible>
          <mui.Paper className={this.props.vm.hasEpisodes ? this.classes.episodeContainer : this.classes.emptyContainer} style={{height}}>
            {this.props.vm.hasEpisodes
              ? this.props.vm.episodes.map((vm, i) => <app.SeriesSeasonEpisodeView key={i} vm={vm} />)
              : <mui.Typography className={this.classes.title}>{language.seriesSeason}</mui.Typography>}
          </mui.Paper>
        </LazyLoad>
      </mui.Grid>
    );
  }

  private calculateHeight(numOfEpisodes: number) {
    const numberOfRows = Math.floor(numOfEpisodes / 7) + Math.min(numOfEpisodes % 7, 1);
    const numberOfGaps = numberOfRows - 1;
    const heightGaps = numberOfGaps * 1;
    const heightRows = numberOfRows * 10;
    const heightPadding = 2 * 1;
    return `max(${heightRows + heightGaps + heightPadding}vw, ${app.sz(50)})`;
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
    gridTemplateRows: '10vw',
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
