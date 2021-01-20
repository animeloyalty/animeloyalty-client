import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class StreamController extends React.Component<{bridge: awe.session.Bridge, svm: awe.session.MainViewModel, vm: awm.StreamViewModel}> {
  static createController(url: string) {
    const bridge = new awe.session.Bridge();
    const svm = new awe.session.MainViewModel(bridge).attach();
    const vm = new awm.StreamViewModel(bridge, url).attach();
    return <StreamController bridge={bridge} svm={svm} vm={vm} />;
  }

  render() {
    return <awe.session.MainView bridge={this.props.bridge} vm={this.props.svm} />;
  }
}
