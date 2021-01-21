import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends awe.shared.BaseComponent<typeof Styles, {vm: awm.MainControlSeekViewModel}> {
  state = {
    thumb: awe.shared.unsafe<(props: React.HTMLAttributes<HTMLSpanElement>) => JSX.Element>((props) => (
      <awm.TooltipComponent interactive placement="top" title={awe.shared.formatTime(this.props.vm.currentTime)}>
        <span {...props} />
      </awm.TooltipComponent>
    ))
  };

  render() {
    return <awm.SliderComponent className={this.classes.slider} color="secondary"
      buffered={this.props.vm.currentBuffer} max={this.props.vm.currentDuration} value={this.props.vm.currentTime}
      onChange={awe.shared.unsafe((_: never, x: number) => this.props.vm.seekStart(x))}
      onChangeCommitted={awe.shared.unsafe((_: never, x: number) => this.props.vm.seekStop(x))}
      ThumbComponent={this.state.thumb} />;
  }
}

const Styles = mui.createStyles({
  slider: {
    padding: 'max(0.8vmin, 4px) 0',
    position: 'absolute',
    top: 0,
    transform: 'translateY(-50%)'
  }
});

export const MainControlSeekView = mui.withStyles(Styles)(Component);
