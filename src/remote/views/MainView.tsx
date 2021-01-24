import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles, {vm: app.MainViewModel}> {
  render() {
    return (
      <mui.Grid>
        <mui.AppBar>
          <mui.Tabs classes={{root: this.classes.tabBar, indicator: "indicator"}} value={this.props.vm.providerName}>
            <mui.Tab className={this.classes.tab} label="CrunchyRoll" value="crunchyroll" onClick={() => this.props.vm.changeProvider('crunchyroll')} />
            <mui.Tab className={this.classes.tab} label="Funimation" value="funimation" onClick={() => this.props.vm.changeProvider('funimation')}  />
          </mui.Tabs>
        </mui.AppBar>
        <mui.Grid className={this.classes.container}>
          <app.LoaderComponent open={this.props.vm.loader.isLoading} />
          <mui.Grid className={this.classes.seriesContainer}>
            {this.props.vm.series.map((vm, i) => <app.MainSeriesView key={i} vm={vm} />)}
          </mui.Grid>
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  tabBar: {
    height: app.sz(30),
    minHeight: 0,
    '& .indicator': {height: app.sz(2), width: `${app.sz(140)} !important`}
  },
  tab: {
    fontSize: app.sz(10),
    minHeight: app.sz(30),
    minWidth: app.sz(140),
    padding: app.sz(5)
  },
  container: {
    overflow: 'hidden',
    paddingTop: app.sz(30)
  },
  seriesContainer: {
    display: 'grid',
    gridGap: '1.5vw 2vw',
    gridTemplateColumns: 'repeat(auto-fill, calc(84vw / 6))',
    justifyContent: 'center',
    padding: '1.5vw 2vw',
    width: '100vw'
  }
});

export const MainView = mui.withStyles(Styles)(Component);
