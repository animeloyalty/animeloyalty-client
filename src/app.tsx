import * as awe from '.';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// TODO:next episode preloader
// TODO:quality selection?let the API serve all streams and their qualities?

// TODO:font sizing of ass
// TODO:size of loader
// TODO:vmin helper? call app.vmin(15) to get a correct css string etc.

// TODO:track times? or wait for library for that.
// TODO:vw/vh/vmin with MAX
// TODO:css -> @global jss
// TODO:image->text scroll
// TODO:image loads... and bgs
// TODO:synopsis and series info etc

// ElectronShell: Disable escape to exit fullscreen/mouselock, disable F11 (in+out), disable fullscreen gesture restriction

/*
TODO:
[ ] brightness controls?
[ ] double click, alt+enter, backslash = fullscreen toggle
[ ] mwheelup, arrowup = louder
[ ] mwhelldown, arrowdown = quieter
[x] Rightarrow = +30s
[x] leftarrow = -15s
*/

@mobxReact.observer
class App extends React.Component {
  render() {
    return (
      <mui.MuiThemeProvider theme={awe.shared.theme}>
        <mui.CssBaseline />
        <awe.shared.DialogManagerView />
        <awe.shared.ViewManagerView />
      </mui.MuiThemeProvider>
    );
  }
}

(function() {
  awe.shared.core.screen.checkStartup();
  awe.shared.core.view.open(awe.remote.MainController.createController());
  ReactDOM.render(<App />, document.getElementById('container'));
})();
