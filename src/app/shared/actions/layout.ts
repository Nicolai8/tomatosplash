import { ExtendedAction } from './action';

export enum LayoutActionTypes {
  ShowNotification = '[Layout] Open ShowNotification',
}

export class ShowNotification implements ExtendedAction {
  readonly type = LayoutActionTypes.ShowNotification;

  constructor(public message: string, public translate: boolean = true) {
  }
}
