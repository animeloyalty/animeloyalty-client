import * as mui from '@material-ui/core';

export const theme = mui.createMuiTheme({
  breakpoints: {values: {xs: 0, sm: 0, md: 0, lg: 0, xl: 0}},
  palette: {primary: {main: '#FA0', contrastText: '#FFF'}, secondary: {main: '#A00', contrastText: '#AAA'}, type: 'dark'},
  overrides: {MuiAppBar: {colorPrimary: {backgroundColor: '#333'}}},
});
