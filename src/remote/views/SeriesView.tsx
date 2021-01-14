import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
export class SeriesView extends app.BaseComponent<typeof SeriesViewStyles, {vm: app.SeriesViewModel}> {
  render() {
    return (
      <mui.Grid>
        {this.props.vm.seasons.map((vm, i) => <app.SeriesSeasonView key={i} vm={vm} />)}
      </mui.Grid>
    );
  }
}

export const SeriesViewStyles = mui.createStyles({
});
