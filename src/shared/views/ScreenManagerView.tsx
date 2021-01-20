import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as React from 'react';

@mobxReact.observer
export class ScreenManagerView extends React.Component {
  componentDidUpdate() {
    const x = awm.core.screen.current.x;
    const y = awm.core.screen.current.y;
    scrollTo(x, y);
  }

  render() {
    return awm.core.screen.current.view;
  }
}
