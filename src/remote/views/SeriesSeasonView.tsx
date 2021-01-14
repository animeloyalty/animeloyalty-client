import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
export class SeriesSeasonView extends app.BaseComponent<typeof SeriesSeasonViewStyles, {vm: app.SeriesSeasonViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <mui.Typography>
          {this.props.vm.title}
        </mui.Typography>
        <mui.Grid className={this.classes.episodeContainer}>
          {this.props.vm.episodes.map((vm, i) => <app.SeriesSeasonEpisodeView key={i} vm={vm} />)}
        </mui.Grid>
      </mui.Grid>
    );
  }
}

export const SeriesSeasonViewStyles = mui.createStyles({
  container: {
    overflow: 'hidden'
  },
  episodeContainer: {
    display: 'grid',
    gridGap: '1vw 2vw',
    gridTemplateColumns: 'repeat(auto-fill, calc(84vw / 6))',
    justifyContent: 'center',
    padding: '1vw 3vw',
    width: '100vw'
  }
});
