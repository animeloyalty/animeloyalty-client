import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles> {
  render() {
    return app.core.dialog.items.map((item, i) => (
      <mui.Modal key={i} open={i === app.core.dialog.items.length - 1}>
        <mui.Paper className={this.classes.container}>
          <mui.Typography className={this.classes.body}>
            {item.body}
          </mui.Typography>
          <mui.Grid className={this.classes.buttonContainer}>
            {item.buttons.map((button, i) => (
              <mui.Button key={i} className={this.classes.button} color={i === item.buttons.length - 1 ? 'primary' : 'default'} onClick={() => item.onClick(i)}>
                {button}
              </mui.Button>
            ))}
          </mui.Grid>
        </mui.Paper>
      </mui.Modal>
    ));
  }
}

const Styles = mui.createStyles({
  container: {
    outline: 0,
    padding: app.sz(8),
    width: app.sz(256),
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  body: {
    fontSize: app.sz(12)
  },
  buttonContainer: {
    textAlign: 'right'
  },
  button: {
    fontSize: app.sz(12),
    marginLeft: app.sz(8),
    marginTop: app.sz(8),
    minWidth: 0,
    padding: `0 ${app.sz(8)}`
  }
});

export const DialogManagerView = mui.withStyles(Styles)(Component);
