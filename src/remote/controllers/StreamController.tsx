import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class StreamController extends React.Component<{vm: app.StreamViewModel}> {
  static createController(url: string) {
    const vm = new app.StreamViewModel(url);
    vm.refreshAsync();
    return <StreamController vm={vm} />;
  }

  render() {
    return this.props.vm.loader.isLoading
      ? <app.LoaderComponent />
      : <app.StreamView vm={this.props.vm} />;
  }
}
