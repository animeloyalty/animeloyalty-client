import * as ace from 'animesync';
import * as awm from '.';
let api: ace.api.ServerApi;
let dialog: awm.DialogManager;
let screen: awm.ScreenManager;

export const core = {
  get api() {
    if (api) return api;
    api = new ace.api.ServerApi('http://127.0.0.1:6583/'); // TODO
    return api;
  },

  get dialog() {
    if (dialog) return dialog;
    dialog = new awm.DialogManager();
    return dialog;
  },

  get screen() {
    if (screen) return screen;
    screen = new awm.ScreenManager();
    return screen;
  }
};
