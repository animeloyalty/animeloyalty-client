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
          <mui.Toolbar>
            <mui.Grid className={this.classes.toolBarPage}>
              <app.MenuComponent className={this.classes.providerMenu} placement="bottom-start">
                <mui.Typography className={this.classes.providerHeader}>
                  Crunchyroll
                </mui.Typography>
                <mui.Grid>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Radio checked color="primary" />} label="Crunchyroll" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Radio color="primary" />} label="Funimation" />
                  </mui.MenuItem>
                  <mui.Divider />
                  <mui.MenuItem>
                    <mui.FormControlLabel label="Settings" control={(
                      <mui.IconButton className={this.classes.settingsIcon}>
                        <app.icons.Settings />
                      </mui.IconButton>
                    )} />
                  </mui.MenuItem>
                </mui.Grid>
              </app.MenuComponent>
              <mui.Typography className={this.classes.headerPage}>
                Popular
              </mui.Typography>
              <mui.Typography className={this.classes.headerPage} color="textSecondary">
                Simulcasts
              </mui.Typography>
              <mui.Typography className={this.classes.headerPage} color="textSecondary">
                Updated
              </mui.Typography>
              <app.MenuComponent placement="bottom-start">
                <mui.Typography className={this.classes.headerPage} color="textSecondary">
                  Seasons
                </mui.Typography>
                <mui.Grid>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Radio color="primary" />} label="Winter 2021" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Radio color="primary" />} label="Fall 2020" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Radio color="primary" />} label="Summer 2020" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Radio color="primary" />} label="Spring 2020" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Radio color="primary" />} label="Winter 2020" />
                  </mui.MenuItem>
                </mui.Grid>
              </app.MenuComponent>
              <app.MenuComponent placement="bottom-start">
                <mui.Typography className={this.classes.headerPage} color="textSecondary">
                  Genres
                </mui.Typography>
                <mui.Grid>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Checkbox color="primary" />} label="Action" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Checkbox color="primary" />} label="Adventure" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Checkbox color="primary" />} label="Comedy" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Checkbox color="primary" />} label="Drama" />
                  </mui.MenuItem>
                  <mui.MenuItem>
                    <mui.FormControlLabel control={<mui.Checkbox color="primary" />} label="Fantasy" />
                  </mui.MenuItem>
                </mui.Grid>
              </app.MenuComponent>
            </mui.Grid>
            <mui.InputBase className={this.classes.search} />
            <mui.IconButton className={this.classes.searchIcon}>
              <app.icons.Search />
            </mui.IconButton>
          </mui.Toolbar>
        </mui.AppBar>
        <mui.Grid className={this.classes.container}>
          <app.LoaderView vm={this.props.vm.loader} />
          {this.props.vm.hasError && <mui.Grid className={this.classes.errorContainer}>
            <mui.IconButton className={this.classes.errorButton} color="primary" onClick={() => this.props.vm.refreshAsync()}>
              <app.icons.Refresh />
            </mui.IconButton>
            <mui.Typography color="textSecondary">
              {language.errorText}
            </mui.Typography>
          </mui.Grid>}
          {this.props.vm.hasSeries && <mui.Paper square={true}>
            <mui.Grid className={this.classes.seriesContainer}>
              {this.props.vm.series.map((vm, i) => <app.MainSeriesView key={i} vm={vm} />)}
            </mui.Grid>
            <LazyLoad offset={128} resize unmountIfInvisible>
              <app.MountComponent onMount={() => this.props.vm.tryMoreAsync()} />
            </LazyLoad>
          </mui.Paper>}
        </mui.Grid>
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  toolBarPage: {
    display: 'flex',
    flex: 1
  },
  settingsIcon: {
    marginLeft: app.sz(-2)
  },
  providerMenu: {
    transform: `translateX(${app.sz(-4)})`
  },
  providerHeader: {
    color: app.theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: app.sz(8),
    width: app.sz(96),
    '&:hover': {color: app.theme.palette.primary.light}
  },
  headerPage: {
    cursor: 'pointer',
    lineHeight: app.sz(32),
    paddingRight: app.sz(16),
    '&:hover': {color: app.theme.palette.primary.main}
  },
  search: {
    backgroundColor: app.theme.palette.secondary.contrastText,
    color: '#303030',
    paddingRight: app.sz(16),
    width: '20%'
  },
  searchIcon: {
    color: '#303030',
    pointerEvents: 'none',
    position: 'absolute',
    right: app.sz(-4)
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
  seriesContainer: {
    display: 'grid',
    gridGap: '1vw 2vw',
    gridTemplateColumns: 'repeat(auto-fill, calc((100% - 10vw) / 6))',
    justifyContent: 'center',
    padding: '1vw 2vw',
    width: '100%',
    '& > *': {height: '22vw'}
  }
});

export const MainView = mui.withStyles(Styles)(View);
