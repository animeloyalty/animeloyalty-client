import * as app from '..';
import * as mui from '@material-ui/core';

export const theme = mui.createMuiTheme({
  breakpoints: {values: {xs: 0, sm: 0, md: 0, lg: 0, xl: 0}},
  palette: {
    primary: {main: '#FA0', contrastText: '#FFF'},
    secondary: {main: '#A00', contrastText: '#AAA'},
    type: 'dark'
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {backgroundColor: '#333'}
    },
    MuiToolbar: {
      root: {height: app.sz(32)},
      gutters: {padding: '0 !important'},
      regular: {minHeight: '0 !important'}
    },
    MuiButton: {
      root: {minWidth: 0},
      text: {padding: `0 ${app.sz(8)}`},
      label: {fontSize: app.sz(12)}
    },
    MuiChip: {
      root: {borderRadius: app.sz(8), height: 'unset'},
      label: {fontSize: app.sz(12), padding: app.sz(8)}
    },
    MuiFormControlLabel: {
      label: {fontSize: app.sz(12)}
    },
    MuiIconButton: {
      root: {padding: app.sz(8)}
    },
    MuiRadio: {
      root: {padding: app.sz(8), '& svg': {height: app.sz(12), width: app.sz(12)}}
    },
    MuiSvgIcon: {
      root: {fontSize: app.sz(15)}
    },
    MuiTypography: {
      body1: {fontSize: app.sz(12), lineHeight: app.sz(16)}
    }
  }
});
