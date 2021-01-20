import * as awe from '../..';
import * as awm from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

// TODO: 
@mobxReact.observer
class Thumb extends React.Component<{vm: awm.MainSeekViewModel} & mui.SliderProps> {
  render() {
    return (
      <awm.TooltipComponent interactive placement="top" title={this.props.vm.displayTime}>
        <span {...this.props} />
      </awm.TooltipComponent>
    );
  }
}

@mobxReact.observer
class Component extends awe.shared.BaseComponent<typeof Styles, {vm: awm.MainSeekViewModel}> {
  private thumb = (props: any) => <Thumb {...props} vm={this.props.vm} />;

  render() {
    return <awm.SliderComponent className={this.classes.slider} color="secondary"
      buffered={this.props.vm.currentBuffer} max={this.props.vm.currentDuration} value={this.props.vm.currentTime}
      onChange={(_, x) => this.props.vm.seekBegin(x)}
      onChangeCommitted={(_, x) => this.props.vm.seekEnd(x)}
      ThumbComponent={this.thumb} />;
  }
}

const Styles = mui.createStyles({
  slider: {
    padding: 'max(0.8vmin, 4px) 0',
    transform: 'translateY(-100%)'
  }
});

export const MainSeekView = mui.withStyles(Styles)(Component);
