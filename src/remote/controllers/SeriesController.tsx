import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class SeriesController extends React.Component<{vm: awm.SeriesViewModel}> {
  static createController(title: string, url: string) {
    const vm = new awm.SeriesViewModel(title, url);
    vm.refreshAsync();
    return <SeriesController vm={vm} />;
  }

  render() {
    return (
      <awe.shared.HeaderTitleComponent title={this.props.vm.title}>
        {this.props.vm.loader.isLoading
          ? <awe.shared.LoaderComponent open={true} />
          : <awm.SeriesView vm={this.props.vm} />}
      </awe.shared.HeaderTitleComponent>
    );
  }
}
