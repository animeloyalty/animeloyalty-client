import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class MainController extends React.Component<{vm: awm.MainViewModel}> {
  static createController() {
    const vm = new awm.MainViewModel();
    vm.refreshAsync();
    return <MainController vm={vm} />;
  }

  render() {
    return (
      <awe.shared.HeaderComponent title={document.title}>
        {this.props.vm.loader.isLoading
          ? <awe.shared.LoaderComponent open={true} />
          : <awm.MainView vm={this.props.vm} />}
      </awe.shared.HeaderComponent>
    );
  }
}
