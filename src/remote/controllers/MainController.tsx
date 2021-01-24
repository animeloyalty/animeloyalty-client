import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class MainController extends React.Component<{vm: app.MainViewModel}> {
  static createController() {
    const vm = new app.MainViewModel();
    vm.refreshAsync();
    return <MainController vm={vm} />;
  }

  render() {
    return (
      <app.HeaderComponent title={document.title}>
        {this.props.vm.loader.isLoading
          ? <app.LoaderComponent open={true} />
          : <app.MainView vm={this.props.vm} />}
      </app.HeaderComponent>
    );
  }
}
