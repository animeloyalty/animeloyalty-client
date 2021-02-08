import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainPageSeriesViewModel}> {
  render() {
    return (
      <app.ImageButtonComponent height="20vw" onClick={() => this.props.vm.open()}
        imageUrl={this.props.vm.imageUrl}
        text={this.props.vm.title} />
    );
  }
}

const Styles = mui.createStyles({
});

export const MainPageSeriesView = mui.withStyles(Styles)(View);
