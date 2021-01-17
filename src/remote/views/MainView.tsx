import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.MainViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <mui.Grid className={this.classes.seriesContainer}>
          {this.props.vm.series.map((vm, i) => <app.MainSeriesView key={i} vm={vm} />)}
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    overflow: 'hidden'
  },
  seriesContainer: {
    display: 'grid',
    gridGap: '1vw 2vw',
    gridTemplateColumns: 'repeat(auto-fill, calc(84vw / 6))',
    justifyContent: 'center',
    padding: '1vw 3vw',
    width: '100vw'
  }
});

export const MainView = mui.withStyles(Styles)(Component);
