import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';

@mobxReact.observer
class View extends app.ViewComponent {
  componentDidUpdate() {
    const x = app.core.view.current.x;
    const y = app.core.view.current.y;
    scrollTo(x, y);
  }

  render() {
    return app.core.view.current.view;
  }
}

const Styles = mui.createStyles({
});

export const ViewManagerView = mui.withStyles(Styles)(View);
