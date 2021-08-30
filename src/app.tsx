import * as app from '.';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hls from 'hls.js';

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
  (async () => {
    // TODO: i also hacked the version.js check.
    // const series = await app.shared.core.api.library.seriesAsync({seriesId: '2cee20e5a0c72e666864db50e880f14e650bd2bc'}); // blue reflection ray
    const series = await app.shared.core.api.library.seriesAsync({seriesId: '02ffd3a2d44592157fae83a1324944f36259e4e5'}); // villainess
    if (!series.value) throw new Error();
    const navigator = app.library.Navigator.create(series.value, 0, 0);
    app.shared.core.view.open(app.library.StreamController.createController(navigator, series.value.id, series.value.seasons[0].episodes[0].id));
  })();

  Hls.DefaultConfig.maxBufferLength = app.shared.settings.videoBuffer;
  ReactDOM.render(<App />, document.getElementById('container'));
})();
