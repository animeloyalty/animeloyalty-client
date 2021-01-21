import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class StreamController extends React.Component<{svm: awe.session.MainViewModel, vm: awm.StreamViewModel}> {
  static createController(navigator: awe.session.INavigator, url: string) {
    const bridge = new awe.session.Bridge();
    const svm = new awe.session.MainViewModel(bridge, navigator).attach();
    const vm = new awm.StreamViewModel(bridge, url).attach();
    return <StreamController svm={svm} vm={vm} />;
  }

  render() {
    return <awe.session.MainView bridge={this.props.vm.bridge} key={this.props.vm.url} vm={this.props.svm} />;
  }
}
