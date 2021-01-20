import * as mui from '@material-ui/core';

export const TooltipComponent = mui.withStyles(() => ({
  tooltip: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    borderRadius: 'max(1vmin, 5px)',
    fontSize: 'max(2vmin, 10px)',
    padding: 'max(1.2vmin, 6px)'
  }
}))(mui.Tooltip);
