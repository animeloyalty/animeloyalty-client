import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class ScreenManagerView extends React.Component {
  componentDidUpdate() {
    const x = app.core.screen.current.x;
    const y = app.core.screen.current.y;
    scrollTo(x, y);
  }

  render() {
    return app.core.screen.current.view;
  }
}
