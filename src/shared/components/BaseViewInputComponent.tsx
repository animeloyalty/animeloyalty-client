import * as app from '..';
import * as mui from '@material-ui/core';

export class BaseViewInputComponent<TStyles extends mui.StyleRules, TProps extends {vm: app.BaseViewModel & app.IInputHandler}> extends app.BaseViewComponent<TStyles, TProps> {
  constructor(props: TProps) {
    super(props);
    app.core.input.subscribe(props.vm);
  }

  componentWillReceiveProps(props: TProps) {
    if (this.props.vm === props.vm) return;
    app.core.input.unsubscribe(this.props.vm);
    app.core.input.subscribe(props.vm);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    app.core.input.unsubscribe(this.props.vm);
  }
}
