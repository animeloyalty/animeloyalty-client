import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.SeriesSeasonViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <mui.Typography>
          {this.props.vm.title}
        </mui.Typography>
        <mui.Grid className={this.classes.episodeContainer}>
          {this.props.vm.episodes.map((vm, i) => <app.ImageComponent key={i} height="8vw" onClick={() => vm.open()}
            imageUrl={vm.imageUrl}
            text={vm.displayName} />)}
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    overflow: 'hidden'
  },
  episodeContainer: {
    display: 'grid',
    gridGap: '1.5vw 2vw',
    gridTemplateColumns: 'repeat(auto-fill, calc(84vw / 6))',
    justifyContent: 'center',
    padding: '1.5vw 2vw',
    width: '100vw'
  }
});

export const SeriesSeasonView = mui.withStyles(Styles)(Component);
