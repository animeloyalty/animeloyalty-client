import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainViewModel}> {
  render() {
    return (
      <mui.Modal open={true}>
        <mui.Paper className={this.classes.container}>
          {!this.props.vm.isSaving && <mui.Grid>
            <app.LoaderView vm={this.props.vm.loader} />
          </mui.Grid>}
          {this.props.vm.isReady && <mui.Grid>
            <app.MainCoreView vm={this.props.vm.core} />
            <app.MainCredentialView vm={this.props.vm.credential} />
            <mui.Grid className={this.classes.buttonContainer}>
              <mui.Button className={this.classes.button} 
                disabled={this.props.vm.isSaving}
                onClick={() => this.props.vm.cancelAsync()}>
                {language.saveNo}
              </mui.Button>
              <mui.Button className={this.classes.button} color="primary"
                disabled={this.props.vm.isSaving}
                onClick={() => this.props.vm.saveAsync()}>
                {language.saveYes}
              </mui.Button>
            </mui.Grid>
          </mui.Grid>}
        </mui.Paper>
      </mui.Modal>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    outline: 0,
    padding: app.sz(8),
    height: app.sz(320),
    width: app.sz(512),
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  buttonContainer: {
    padding: `0 ${app.sz(8)}`,
    textAlign: 'right'
  },
  button: {
    marginLeft: app.sz(8)
  }
});

export const MainView = mui.withStyles(Styles)(View);
