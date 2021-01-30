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

app.shared.unsafe(window).checkStartup = () => {
  return app.shared.core.screen.checkStartup(true);
};

(function() {
  app.shared.core.screen.checkStartup(false);
  app.shared.core.view.open(app.remote.MainController.createController());
  app.shared.unsafe(videojs).Vhs.GOAL_BUFFER_LENGTH = app.shared.settings.videoBuffer;
  app.shared.unsafe(videojs).Vhs.MAX_GOAL_BUFFER_LENGTH = app.shared.settings.videoBufferMax;
  ReactDOM.render(<App />, document.getElementById('container'));
})();
