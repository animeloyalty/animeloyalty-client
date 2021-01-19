import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles> {
  render() {
    return <app.StreamSlider className={this.classes.slider} color="secondary"
      buffered={1300} max={1600}
      ThumbComponent={(props) => <app.StreamSliderTooltip interactive placement="top" title={'05:23'}><span {...props} /></app.StreamSliderTooltip>} />;
  }
}

const Styles = mui.createStyles({
  slider: {
    padding: 'max(0.8vmin, 4px) 0',
    transform: 'translateY(-50%)'
  }
});

export const StreamFooterSeekView = mui.withStyles(Styles)(Component);
