import * as areas from './areas';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

@mobxReact.observer
class App extends React.Component {
  render() {
    return (
      <mui.MuiThemeProvider theme={areas.shared.theme}>
        <mui.CssBaseline />
        <areas.shared.DialogManagerView />
        <areas.shared.ScreenManagerView />
      </mui.MuiThemeProvider>
    );
  }
}

(function() {
  areas.shared.core.screen.openAsync(areas.remote.MainController.constructAsync);
  ReactDOM.render(<App />, document.getElementById('container'));
})();
