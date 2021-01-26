import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.SeriesViewModel}> {
  render() {
    return (
      <mui.Grid>
        <app.LoaderComponent vm={this.props.vm.loader} />
        {this.props.vm.seasons.map((vm, i) => <app.SeriesSeasonView key={i} vm={vm} />)}
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
});

export const SeriesView = mui.withStyles(Styles)(Component);
