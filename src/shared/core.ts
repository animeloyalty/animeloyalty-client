import * as ace from 'animesync';
import * as awm from '.';
let api: ace.api.ServerApi;
let dialog: awm.DialogManager;
let input: awm.InputManager;
let screen: awm.ScreenManager;
let view: awm.ViewManager;

export const core = {
  get api() {
    api ??= new ace.api.ServerApi('http://127.0.0.1:6583/'); // TODO
    return api;
  },

  get dialog() {
    dialog ??= new awm.DialogManager();
    return dialog;
  },

  get input() {
    input ??= new awm.InputManager().attach();
    return input;
  },

  get screen() {
    screen ??= new awm.ScreenManager().attach();
    return screen;
  },

  get view() {
    view ??= new awm.ViewManager();
    return view;
  }
};
