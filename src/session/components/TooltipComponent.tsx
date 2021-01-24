import * as app from '..';
import * as mui from '@material-ui/core';

export const TooltipComponent = mui.withStyles(() => ({
  tooltip: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    borderRadius: app.sz(5),
    fontSize: app.sz(10),
    padding: app.sz(6)
  }
}))(mui.Tooltip);
