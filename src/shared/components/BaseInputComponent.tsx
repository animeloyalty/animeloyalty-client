import * as app from '..';
import * as mui from '@material-ui/core';

export class BaseInputComponent<TStyles extends mui.StyleRules, TProps extends {vm: app.IInputHandler}> extends app.BaseComponent<TStyles, TProps> {
  componentDidMount() {
    app.core.input.subscribe(this.props.vm);
  }

  componentWillReceiveProps(props: TProps) {
    app.core.input.unsubscribe(this.props.vm);
    app.core.input.subscribe(props.vm);
  }

  componentWillUnmount() {
    app.core.input.unsubscribe(this.props.vm);
  }
}
