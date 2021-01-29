import * as app from '.';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// TODO: can actually decrepate the entire inputview and use viewmount/viewunmount calls inside the vm itself..
// TODO: attach/subscribe() on the onViewMount stuff?
// TODO: we can also make a schedule class to set/clear schedules since it became such a common theme.
// TODO: private _
// ElectronShell: Disable escape to exit fullscreen/mouselock, disable fullscreen gesture restriction?

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
