import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles> {
  render() {
    return app.core.dialog.items.map((item, i) => (
      <mui.Dialog key={i} fullWidth maxWidth={false} open={i === app.core.dialog.items.length - 1}>
        <mui.DialogContent className={this.classes.content}>
          <mui.DialogContentText>
            {item.body}
          </mui.DialogContentText>
          {Boolean(item.errorTexts.length) && <pre className={this.classes.error}>
            {item.errorTexts.map((errorText) => <text>{errorText}</text>)}
          </pre>}
        </mui.DialogContent>
        <mui.DialogActions>
          {item.buttons.map((button, i) => (
            <mui.Button key={i} color={i === item.buttons.length - 1 ? 'primary' : 'default'} onClick={() => item.send(i)}>
              {button}
            </mui.Button>
          ))}
        </mui.DialogActions>
      </mui.Dialog>
    ));
  }
}

const Styles = mui.createStyles({
  content: {
    paddingTop: 24
  },
  error: {
    height: 128,
    overflow: 'scroll'
  }
});

export const DialogManagerView = mui.withStyles(Styles)(Component);
