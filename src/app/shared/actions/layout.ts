import { ExtendedAction } from './action';

export enum LayoutActionTypes {
  ShowNotification = '[Layout] Open ShowNotification',
  ShowDevConsole = '[Layout] Open ShowDevConsole',
}

export class ShowNotification implements ExtendedAction {
  readonly type = LayoutActionTypes.ShowNotification;

  constructor(public message: string, public translate: boolean = true) {
  }
}

export class ShowDevConsole implements ExtendedAction {
  readonly type = LayoutActionTypes.ShowDevConsole;
}
