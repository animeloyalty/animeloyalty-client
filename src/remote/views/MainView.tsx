import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
export class MainView extends app.BaseComponent<typeof MainViewStyles, {vm: app.MainViewModel}> {
  render() {
    return (
      <mui.Grid className={this.classes.container}>
        <mui.Grid className={this.classes.seriesContainer}>
          {this.props.vm.series.map((vm) => <app.MainSeriesView key={vm.imageUrl} vm={vm} />)}
        </mui.Grid>
      </mui.Grid>
    );
  }
}

export const MainViewStyles = mui.createStyles({
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
