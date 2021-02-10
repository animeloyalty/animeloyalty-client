import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import {session} from '../..';

@mobxReact.observer
export class StreamController extends app.ViewComponent<{}, {svm: session.MainViewModel, vm: app.StreamViewModel}> {
  static createController(navigator: session.INavigator, url: string, shouldDelay = false) {
    const bridge = new session.Bridge();
    const svm = new session.MainViewModel(bridge, navigator);
    const vm = new app.StreamViewModel(bridge, navigator, url, shouldDelay);
    return <StreamController svm={svm} vm={vm} />;
  }

  render() {
    return <session.MainView bridge={this.props.vm.bridge} key={this.props.vm.url} vm={this.props.svm} />;
  }
}
