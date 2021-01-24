import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class ViewManagerView extends React.Component {
  componentDidUpdate() {
    const x = awm.core.view.current.x;
    const y = awm.core.view.current.y;
    scrollTo(x, y);
  }

  render() {
    return awm.core.view.current.view;
  }
}
