import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class SeriesController extends React.Component<{vm: app.SeriesViewModel}> {
  static createController(title: string, url: string) {
    const vm = new app.SeriesViewModel(title, url);
    vm.refreshAsync();
    return <SeriesController vm={vm} />;
  }

  render() {
    return (
      <app.HeaderTitleComponent title={this.props.vm.title}>
        {this.props.vm.loader.isLoading
          ? <app.LoaderComponent open={true} />
          : <app.SeriesView vm={this.props.vm} />}
      </app.HeaderTitleComponent>
    );
  }
}
