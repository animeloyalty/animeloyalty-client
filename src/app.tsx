import * as app from '.';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import videojs from 'video.js';

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

window.animeloyalty = {
  electronStart: app.shared.core.screen.onElectronStart.bind(app.shared.core.screen),
  electronState: app.shared.core.screen.onElectronState.bind(app.shared.core.screen)
};

(function() {
  app.shared.core.view.open(app.remote.MainController.createController());
  app.shared.api.unsafe(videojs).Vhs.GOAL_BUFFER_LENGTH = app.shared.settings.videoBuffer;
  app.shared.api.unsafe(videojs).Vhs.MAX_GOAL_BUFFER_LENGTH = app.shared.settings.videoBufferMax;
  ReactDOM.render(<App />, document.getElementById('container'));
})();
