import * as awm from '..';
import * as mui from '@material-ui/core';
import * as React from 'react';

export class BaseComponent<TStyles extends mui.StyleRules, TProps = {}> extends React.Component<TProps> {
  get classes(): Record<keyof TStyles, string> {
    return awm.unsafe(this.props).classes;
  }
}
