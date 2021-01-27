import LazyLoad from 'react-lazyload';
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
          <mui.Tabs className={this.classes.tabBar} value={this.props.vm.providerName}>
            <mui.Tab className={this.classes.tab}
              label="CrunchyRoll" value="crunchyroll"
              onClick={() => this.props.vm.changeProvider('crunchyroll')} />
            <mui.Tab className={this.classes.tab}
              label="Funimation" value="funimation"
              onClick={() => this.props.vm.changeProvider('funimation')}  />
          </mui.Tabs>
        </mui.AppBar>
        <mui.Grid className={this.classes.container}>
          <app.LoaderComponent vm={this.props.vm.loader} />
          {this.props.vm.hasSeries && <mui.Paper className={this.classes.seriesContainer} square={true}>
            {this.props.vm.series.map((vm, i) => <app.ImageButtonComponent key={i} height="20vw" onClick={() => vm.open()}
              imageUrl={vm.imageUrl}
              text={vm.title} />)}
            <LazyLoad resize unmountIfInvisible>
              <app.MountComponent onMount={() => this.props.vm.tryNextAsync()} />
            </LazyLoad>
          </mui.Paper>}
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  tabBar: {
    height: app.sz(30),
    minHeight: 0,
    '& .MuiTabs-indicator': {height: app.sz(2), width: `${app.sz(140)} !important`}
  },
  tab: {
    fontSize: app.sz(12),
    minHeight: app.sz(30),
    minWidth: app.sz(140),
    padding: app.sz(5)
  },
  container: {
    paddingTop: app.sz(30)
  },
  seriesContainer: {
    display: 'grid',
    gridGap: '2vw',
    gridTemplateColumns: 'repeat(auto-fill, calc((100% - 10vw) / 6))',
    justifyContent: 'center',
    padding: '2vw',
    width: '100%'
  }
});

export const MainView = mui.withStyles(Styles)(Component);
