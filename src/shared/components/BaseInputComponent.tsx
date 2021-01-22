import * as awm from '..';
import * as mui from '@material-ui/core';

export class BaseInputComponent<TStyles extends mui.StyleRules, TProps extends {vm: awm.IInputHandler}> extends awm.BaseComponent<TStyles, TProps> {
  componentDidMount() {
    awm.core.input.subscribe(this.props.vm);
  }

  componentWillReceiveProps(props: TProps) {
    awm.core.input.unsubscribe(this.props.vm);
    awm.core.input.subscribe(props.vm);
  }

  componentWillUnmount() {
    awm.core.input.unsubscribe(this.props.vm);
  }
}
