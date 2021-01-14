import * as mobx from 'mobx';

export class DialogManager {
  constructor() {
    this.items = [];
  }

  @mobx.action
  async openAsync(body: string, buttons: string[], ...errors: any[]) {
    return await new Promise<number>((resolve) => {
      const id = this.items.length + 1;
      const errorTexts = errors.map(convertErrorText).filter(Boolean).map((errorText) => errorText!);
      this.items.push({body, buttons, errorTexts, id, send: (index: number) => {
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
    body: string;
    buttons: string[];
    errorTexts: string[];
    id: number;
    send: (index: number) => void;
  }[];
}

function convertErrorText(error?: any) {
  if (error instanceof Error) return error.stack;
  else if (error) return String(error) || undefined;
  else return;
}
