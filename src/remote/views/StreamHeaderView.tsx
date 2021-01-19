import * as app from '..';
import * as mobxReact from 'mobx-react';
import * as mui from '@material-ui/core';
import * as React from 'react';

@mobxReact.observer
class Component extends app.BaseComponent<typeof Styles> {
  render() {
    return (
      <mui.AppBar className={this.classes.appBar}>
        <mui.Toolbar className={this.classes.toolBar}>
          <mui.IconButton className={this.classes.iconButton} onClick={() => app.core.screen.leave()}>
            <app.icons.ArrowBackIos />
          </mui.IconButton>
          <mui.Grid className={this.classes.title}>
            <mui.Typography className={this.classes.titleTop}>
              Episode 01 – To You, 2,000 Years in the Future -The Fall of Zhiganshina (1) 
            </mui.Typography>
            <mui.Typography className={this.classes.titleBottom}>
              Attack on Titan ● Attack on Titan
            </mui.Typography>
          </mui.Grid>
        </mui.Toolbar>
      </mui.AppBar>
    );
  }
}

const Styles = mui.createStyles({
  appBar: {
    backgroundColor: 'transparent'
  },
  toolBar: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    height: 'max(6vmin, 30px)',
    minHeight: 0,
    paddingLeft: 0
  },
  iconButton: {
    padding: 'max(1.2vmin, 6px)',
    paddingLeft: 'max(2vmin, 10px)',
    paddingRight: 'max(0.8vmin, 4px)',
    '& svg': {fontSize: 'max(3vmin, 15px)'}
  },
  title: {
    flex: 1,
    width: 0
  },
  titleTop: {
    fontSize: 'max(2vmin, 10px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  titleBottom: {
    color: '#AAA',
    fontSize: 'max(2vmin, 10px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const StreamHeaderView = mui.withStyles(Styles)(Component);
