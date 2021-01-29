import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class Component extends app.BaseViewInputComponent<typeof Styles, {vm: app.SeriesViewModel}> {
  render() {
    return (
      <app.HeaderTitleComponent primary={this.props.vm.title}>
        <app.LoaderComponent vm={this.props.vm.loader} />
        {!this.props.vm.loader.isLoading && <mui.Grid>
          <mui.Paper className={this.classes.container} square={true}>
            <mui.Grid className={this.classes.imageContainer}>
              <app.ImageComponent imageUrl={this.props.vm.imageUrl} />
            </mui.Grid>
            <mui.Typography className={this.classes.summary}>
              {this.props.vm.synopsis ?? language.seriesSynopsis}
            </mui.Typography>
            {this.props.vm.hasGenres && <mui.Grid className={this.classes.genresContainer}>
              <mui.Divider className={this.classes.divider} />
              {this.props.vm.genres.map((genre, i) => <mui.Chip key={i} label={genre} />)}
            </mui.Grid>}
            <mui.Grid className={this.classes.clear} />
          </mui.Paper>
          {this.props.vm.seasons.map((vm, i) => <app.SeriesSeasonView key={i} vm={vm} />)}
        </mui.Grid>}
      </app.HeaderTitleComponent>
    );
  }
}

const Styles = mui.createStyles({
  container: {
    padding: app.sz(8)
  },
  imageContainer: {
    float: 'left',
    height: app.sz(192),
    marginRight: app.sz(8),
    width: app.sz(128)
  },
  summary: {
    fontSize: app.sz(12),
    height: app.sz(192 - 50),
    overflow: 'auto',
    wordBreak: 'break-word'
  },
  genresContainer: {
    height: app.sz(50),
    overflow: 'hidden',
    '& .MuiChip-label': {padding: app.sz(8)},
    '& .MuiChip-root': {borderRadius: app.sz(8), fontSize: app.sz(12), height: 'unset', marginRight: app.sz(8)}
  },
  divider: {
    margin: `${app.sz(8)} 0`
  },
  clear: {
    clear: 'both'
  }
});

export const SeriesView = mui.withStyles(Styles)(Component);
