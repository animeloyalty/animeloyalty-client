import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends awe.shared.BaseComponent<typeof Styles, {vm: awm.SeriesViewModel}> {
  render() {
    return (
      <mui.Grid>
        {this.props.vm.seasons.map((vm, i) => <awm.SeriesSeasonView key={i} vm={vm} />)}
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
});

export const SeriesView = mui.withStyles(Styles)(Component);
