import * as app from '..';
import * as mui from '@material-ui/core';

export class BaseViewComponent<TStyles extends mui.StyleRules, TProps extends {vm: app.BaseViewModel}> extends app.BaseComponent<TStyles, TProps> {
  componentDidMount() {
    this.props.vm.onViewMount();
  }

  componentWillUnmount() {
    this.props.vm.onViewUnmount();
  }
}
