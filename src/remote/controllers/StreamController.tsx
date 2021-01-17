import * as app from '..';
import * as React from 'react';

export class StreamController extends React.Component<{vm: app.StreamViewModel}> {
  static createConstruct(url: string) {
    return async () => {
      const vm = new app.StreamViewModel(url);
      await vm.refreshAsync();
      return <StreamController vm={vm} />;
    };
  }

  render() {
    return <app.StreamView vm={this.props.vm} />;
  }
}
