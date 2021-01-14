import * as app from '..';
import * as React from 'react';

export class SeriesController extends React.Component<{vm: app.SeriesViewModel}> {
  static createConstruct(url: string) {
    return async () => {
      const vm = new app.SeriesViewModel(url);
      await vm.refreshAsync();
      return <SeriesController vm={vm} />;
    };
  }

  render() {
    return (
      <app.HeaderTitleComponent title={this.props.vm.title}>
        <app.SeriesView vm={this.props.vm} />
      </app.HeaderTitleComponent>
    );
  }
}
