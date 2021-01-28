import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.SeriesSeasonViewModel}> {
  render() {
    return (
      <mui.Grid>
        <mui.Typography className={this.classes.title}>
          {this.props.vm.title}
        </mui.Typography>
        <mui.Paper className={this.classes.episodeContainer} square={true}>
          {this.props.vm.episodes.map((vm, i) => <app.SeriesSeasonEpisodeView key={i} vm={vm} />)}
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
  }
});

export const SeriesSeasonView = mui.withStyles(Styles)(Component);
