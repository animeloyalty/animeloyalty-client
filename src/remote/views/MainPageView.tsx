import LazyLoad from 'react-lazyload';
import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';
import {language} from '../language';

@mobxReact.observer
class View extends app.ViewComponent<typeof Styles, {vm: app.MainPageViewModel}> {
  render() {
    return (
      <mui.Grid>
        <app.LoaderView vm={this.props.vm.loader} />
        {this.props.vm.isEmpty && <mui.Grid className={this.classes.textContainer}>
          <mui.Typography color="textSecondary">
            {language.emptyText}
          </mui.Typography>
        </mui.Grid>}
        {this.props.vm.hasError && <mui.Grid className={this.classes.textContainer}>
          <mui.IconButton className={this.classes.textButton} color="primary" onClick={() => this.props.vm.refreshAsync()}>
            <app.icons.Refresh />
          </mui.IconButton>
          <mui.Typography color="textSecondary">
            {language.errorText}
          </mui.Typography>
        </mui.Grid>}
        {this.props.vm.hasSeries && <mui.Paper square={true}>
          <mui.Grid className={this.classes.seriesContainer}>
            {this.props.vm.series.map((vm, i) => <app.MainPageSeriesView key={i}
              height={this.props.vm.isNarrow ? '9vw' : '20vw'}
              vm={vm} />)}
          </mui.Grid>
          <LazyLoad offset={128} resize unmountIfInvisible>
            <app.MountComponent onMount={() => this.props.vm.tryMoreAsync()} />
          </LazyLoad>
        </mui.Paper>}
      </mui.Grid>
    );
  }
}

const Styles = mui.createStyles({
  textContainer: {
    textAlign: 'center',
    width: app.sz(300),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  textButton: {
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
    '& > *': (props: {vm: app.MainPageViewModel}) => ({height: props.vm.isNarrow ? '11vw' : '22vw'})
  }
});

export const MainPageView = mui.withStyles(Styles)(View);
