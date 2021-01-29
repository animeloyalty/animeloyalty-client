import * as mobx from 'mobx';

export class DialogManager {
  constructor() {
    this.items = [];
  }

  @mobx.action
  async openAsync(body: string, buttons: string[]) {
    return await new Promise<number>((resolve) => {
      this.items.push({body, buttons, onClick: (index: number) => {
        this.items.pop();
        resolve(index);
      }});
    });
  }

  @mobx.computed
  get isChildVisible() {
    return this.items.length !== 0;
  }

  @mobx.observable
  items: {
    body: string,
    buttons: string[],
    error?: string,
    onClick: (index: number) => void;
  }[];
}
