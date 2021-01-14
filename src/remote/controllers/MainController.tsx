import * as app from '..';
import * as React from 'react';

export class MainController extends React.Component<{vm: app.MainViewModel}> {
  static async constructAsync() {
    const vm = new app.MainViewModel();
    await vm.refreshAsync();
    return <MainController vm={vm} />;
  }

  render() {
    return (
      <app.HeaderComponent title={document.title}>
        <app.MainView vm={this.props.vm} />
      </app.HeaderComponent>
    );
  }
}
