import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {setting} from '../..';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainViewModel}> {
  render() {
    return (
      <mui.Grid>
        {this.props.vm.providers && this.props.vm.selectedProvider && <mui.AppBar>
          <mui.Toolbar>
            <mui.Grid className={this.classes.navigation}>
              <app.MenuComponent className={this.classes.providerMenu} placement="bottom-start">
                <mui.Typography className={this.classes.provider}>
                  {this.props.vm.selectedProvider.label}
                </mui.Typography>
                <mui.Grid>
                  {this.props.vm.providers.map((provider, i) => <mui.MenuItem key={i} onClick={() => this.props.vm.changeProvider(provider)}>
                    <mui.FormControlLabel className={this.classes.pageMenuLabel} label={provider.label} control={<mui.Radio
                      checked={this.props.vm.selectedProvider === provider}
                      color="primary" />} />
                  </mui.MenuItem>)}
                  <mui.Divider />
                  <mui.MenuItem onClick={() => this.props.vm.toggleSettingAsync()}>
                    <mui.FormControlLabel className={this.classes.pageMenuLabel} label="Settings" control={<mui.IconButton>
                      <app.icons.Settings />
                    </mui.IconButton>} />
                  </mui.MenuItem>
                </mui.Grid>
              </app.MenuComponent>
              {this.props.vm.selectedProvider.pages.map((page, i) => (
                <app.MenuComponent key={i} className={this.classes.pageMenu} placement="bottom-start">
                  <mui.Typography onClick={() => this.props.vm.changePage(page)}
                    className={this.classes.page}
                    color={this.props.vm.selectedPage === page ? 'textPrimary' : 'textSecondary'}>
                    {page.label}
                  </mui.Typography>
                  {page.options.map((option, i) => <mui.MenuItem key={i} onClick={() => this.props.vm.changeOption(page, option)}>
                    <mui.FormControlLabel className={this.classes.pageMenuLabel} label={option.label} control={page.type === 'mixOf'
                      ? <mui.Checkbox checked={this.props.vm.selectedOptions.includes(option)} color="primary" />
                      : <mui.Radio checked={this.props.vm.selectedOptions.includes(option)} color="primary" />} />
                  </mui.MenuItem>)}
                </app.MenuComponent>
              ))}
            </mui.Grid>
            <mui.InputBase className={this.classes.search}
              onChange={(ev) => this.props.vm.changeSearch(ev.currentTarget.value)}
              onKeyDown={(ev) => this.onKeyDown(ev)}
              value={this.props.vm.nextSearch ?? ''} />
            <mui.IconButton className={this.classes.searchIcon}>
              <app.icons.Search />
            </mui.IconButton>
          </mui.Toolbar>
        </mui.AppBar>}
        {this.props.vm.page && <mui.Grid className={this.classes.container}>
          <app.MainPageView vm={this.props.vm.page} />
        </mui.Grid>}
        {this.props.vm.setting && <mui.Grid>
          <setting.MainView vm={this.props.vm.setting} />
        </mui.Grid>}
      </mui.Grid>
    );
  }

  private onKeyDown(ev: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (ev.key !== 'Enter') return;
    this.props.vm.submitSearch();
    ev.currentTarget.blur();
  }
}

const Styles = mui.createStyles({
  navigation: {
    display: 'flex',
    flex: 1
  },
  providerMenu: {
    transform: `translateX(${app.sz(-4)})`
  },
  provider: {
    color: app.theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: app.sz(8),
    width: app.sz(96),
    '&:hover': {color: app.theme.palette.primary.light}
  },
  pageMenu: {
    maxHeight: app.sz(224),
    overflowY: 'auto'
  },
  pageMenuLabel: {
    pointerEvents: 'none'
  },
  page: {
    cursor: 'pointer',
    lineHeight: app.sz(32),
    paddingRight: app.sz(16),
    '&:hover': {color: app.theme.palette.primary.main}
  },
  search: {
    width: '20%',
    '& input': {height: app.sz(16), paddingRight: app.sz(24)}
  },
  searchIcon: {
    color: app.theme.palette.primary.contrastText,
    pointerEvents: 'none',
    position: 'absolute',
    right: app.sz(-4)
  },
  container: {
    paddingTop: app.sz(32)
  }
});

export const MainView = mui.withStyles(Styles)(View);
