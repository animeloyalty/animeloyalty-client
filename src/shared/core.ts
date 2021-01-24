import * as ace from 'animesync';
import * as app from '.';
let api: ace.api.ServerApi;
let dialog: app.DialogManager;
let input: app.InputManager;
let screen: app.ScreenManager;
let store: app.StoreManager;
let view: app.ViewManager;

export const core = {
  get api() {
    api ??= new ace.api.ServerApi('http://127.0.0.1:6583/'); // TODO
    return api;
  },

  get dialog() {
    dialog ??= new app.DialogManager();
    return dialog;
  },

  get input() {
    input ??= new app.InputManager().attach();
    return input;
  },

  get screen() {
    screen ??= new app.ScreenManager().attach();
    return screen;
  },

  get store() {
    store ??= new app.StoreManager();
    return store;
  },

  get view() {
    view ??= new app.ViewManager();
    return view;
  }
};
