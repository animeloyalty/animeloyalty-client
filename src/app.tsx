import * as app from '.';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// TODO:infinite load
// TODO: tab loading, switch back, loader still visible, concurrency of results, etc.
// TODO:private _
// TODO:synopsis and series info etc

// ElectronShell: Disable escape to exit fullscreen/mouselock, disable F11 (in+out), disable fullscreen gesture restriction

@mobxReact.observer
class App extends React.Component {
  render() {
    return (
      <mui.MuiThemeProvider theme={app.shared.theme}>
        <mui.CssBaseline />
        <app.shared.DialogManagerView />
        <app.shared.ViewManagerView />
      </mui.MuiThemeProvider>
    );
  }
}

(function() {
  app.shared.core.screen.checkStartup();
  app.shared.core.view.open(app.remote.MainController.createController());
  ReactDOM.render(<App />, document.getElementById('container'));
})();
