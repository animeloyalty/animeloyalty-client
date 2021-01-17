import * as app from '.';
import * as ace from 'animesync';
let api: ace.api.ServerApi;
let dialog: app.DialogManager;
let screen: app.ScreenManager;

export const core = {
  get api() {
    if (api) return api;
    api = new ace.api.ServerApi('http://127.0.0.1:6583/'); // TODO
    return api;
  },

  get dialog() {
    if (dialog) return dialog;
    dialog = new app.DialogManager();
    return dialog;
  },

  get screen() {
    if (screen) return screen;
    screen = new app.ScreenManager();
    return screen;
  }
};
