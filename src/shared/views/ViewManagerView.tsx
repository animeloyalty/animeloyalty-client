import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class ViewManagerView extends React.Component {
  componentDidUpdate() {
    const x = app.core.view.current.x;
    const y = app.core.view.current.y;
    scrollTo(x, y);
  }

  render() {
    return app.core.view.current.view;
  }
}
