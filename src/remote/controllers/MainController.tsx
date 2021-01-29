import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class MainController extends app.ViewComponent<{}, {vm: app.MainViewModel}> {
  static createController() {
    const vm = new app.MainViewModel();
    vm.refreshAsync();
    return <MainController vm={vm} />;
  }

  render() {
    return <app.MainView key={this.props.vm.providerName} vm={this.props.vm} />;
  }
}
