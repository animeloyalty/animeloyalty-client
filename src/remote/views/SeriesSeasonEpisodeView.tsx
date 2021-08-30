import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.SeriesSeasonEpisodeViewModel}> {
  render() {
    return (
      <app.ImageButtonComponent height="8vw" onClick={() => this.props.vm.open()}
        imageUrl={this.props.vm.imageUrl}
        text={this.props.vm.displayName} />
    );
  }
}

const Styles = mui.createStyles({
});

export const SeriesSeasonEpisodeView = mui.withStyles(Styles)(View);
