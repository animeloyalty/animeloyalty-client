import * as mui from '@material-ui/core';

export function connectStyles(source: Record<any, any>) {
  for (const key in source) {
    const match = key.match(/^((.*)Styles)$/);
    const value = source[key];
    const view = match && source[match[2]];
    if (match && value && view) {
      source[match[2]] = mui.withStyles(value)(view);
    } else if (value && typeof value === 'object') {
      connectStyles(value);
    }
  }
}
