import * as app from '..';
import * as React from 'react';

export class StreamController extends React.Component<{title: string, vm: app.StreamViewModel}> {
  static createConstruct(title: string, url: string) {
    return async () => {
      const vm = new app.StreamViewModel(url);
      await vm.refreshAsync();
      return <StreamController title={title} vm={vm} />;
    };
  }

  render() {
    return <app.StreamView vm={this.props.vm} />;
  }
}
