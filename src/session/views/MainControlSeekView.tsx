import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.MainControlSeekViewModel}> {
  state = {
    thumb: app.unsafe<(props: React.HTMLAttributes<HTMLSpanElement>) => JSX.Element>((props) => (
      <app.TooltipComponent interactive placement="top" title={app.formatTime(this.props.vm.currentTime)}>
        <span {...props} />
      </app.TooltipComponent>
    ))
  };

  render() {
    return <app.SliderComponent className={this.classes.slider} color="secondary"
      buffered={this.props.vm.currentBuffer} max={this.props.vm.currentDuration} value={this.props.vm.currentTime}
      onChange={app.unsafe((_: never, x: number) => this.props.vm.seekStart(x))}
      onChangeCommitted={app.unsafe((_: never, x: number) => this.props.vm.seekStop(x))}
      ThumbComponent={this.state.thumb} />;
  }
}

const Styles = mui.createStyles({
  slider: {
    padding: `${app.sz(5)} 0`,
    position: 'absolute',
    top: 0,
    transform: 'translateY(-50%)'
  }
});

export const MainControlSeekView = mui.withStyles(Styles)(Component);
