import * as React from 'react';

export class MountComponent extends React.Component<{onMount: () => void}> {
  componentDidMount() {
    this.props.onMount();
  }
  
  render() {
    return false;
  }
}
