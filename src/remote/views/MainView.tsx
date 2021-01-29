import LazyLoad from 'react-lazyload';
import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainViewModel}> {
  render() {
    return (
      <mui.Grid>
        <mui.AppBar>
          <mui.Tabs className={this.classes.tabBar} indicatorColor="primary" value={this.props.vm.providerName}>
            <mui.Tab className={this.classes.tab}
              label="CrunchyRoll" value="crunchyroll"
              onClick={() => this.props.vm.changeProvider('crunchyroll')} />
            <mui.Tab className={this.classes.tab}
              label="Funimation" value="funimation"
              onClick={() => this.props.vm.changeProvider('funimation')}  />
          </mui.Tabs>
        </mui.AppBar>
        <mui.Grid className={this.classes.container}>
          <app.LoaderView vm={this.props.vm.loader} />
          {this.props.vm.hasError && <mui.Grid className={this.classes.errorContainer}>
            <mui.IconButton className={this.classes.errorButton} color="primary" onClick={() => this.props.vm.refreshAsync()}>
              <app.icons.Refresh />
            </mui.IconButton>
            <mui.Typography className={this.classes.errorText} color="textSecondary">
              {language.errorText}
            </mui.Typography>
          </mui.Grid>}
          {this.props.vm.hasSeries && <mui.Paper className={this.classes.seriesContainer} square={true}>
            {this.props.vm.series.map((vm, i) => <app.MainSeriesView key={i} vm={vm} />)}
            <LazyLoad resize unmountIfInvisible>
              <app.MountComponent onMount={() => this.props.vm.tryMoreAsync()} />
            </LazyLoad>
          </mui.Paper>}
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  tabBar: {
    height: app.sz(32),
    minHeight: 0,
    '& .MuiTabs-indicator': {height: app.sz(2), width: `${app.sz(160)} !important`}
  },
  tab: {
    fontSize: app.sz(12),
    minHeight: app.sz(32),
    minWidth: app.sz(160),
    textTransform: 'none'
  },
  container: {
    paddingTop: app.sz(32)
  },
  errorContainer: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  errorButton: {
    padding: app.sz(8),
    '& svg': {fontSize: app.sz(45)}
  },
  errorText: {
    fontSize: app.sz(12)
  },
  seriesContainer: {
    display: 'grid',
    gridGap: '1vw 2vw',
    gridTemplateColumns: 'repeat(auto-fill, calc((100% - 10vw) / 6))',
    gridTemplateRows: '22vw',
    justifyContent: 'center',
    padding: '1vw 2vw',
    width: '100%'
  }
});

export const MainView = mui.withStyles(Styles)(View);
