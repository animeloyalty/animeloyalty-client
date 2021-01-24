import * as mobx from 'mobx';
import * as React from 'react';

export class ViewManager {
  constructor() {
    const view = React.createElement('span');
    this.views = [{view, x: 0, y: 0}];
  }

  @mobx.action
  leave() {
    this.views.pop();
  }

  @mobx.action
  open(view: React.ReactElement) {
    this.current.x = scrollX;
    this.current.y = scrollY;
    this.views.push({view, x: 0, y: 0});
  }

  @mobx.action
  replace(view: React.ReactElement) {
    this.views.pop();
    this.views.push({view, x: 0, y: 0});
  }

  @mobx.computed
  get current() {
    return this.views[this.views.length - 1];
  }
  
  @mobx.observable
  private views: {
    view: React.ReactElement,
    x: number,
    y: number
  }[];
}
