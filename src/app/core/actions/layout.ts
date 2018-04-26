import { ExtendedAction } from './action';

export enum LayoutActionTypes {
  ShowNotification = '[Layout] Open ShowNotification',
  ShowDevConsole = '[Layout] Open ShowDevConsole',
  ToggleSidenav = '[Layout] ToggleSidenav',
  SetSidenavMode = '[Layout] SetSidenavMode',
  ToggleSidenavButton = '[Layout] ToggleSidenavButton',
  ToggleSettingsButton = '[Layout] ToggleSettingsButton',
  ToggleHomeButton = '[Layout] ToggleHomeButton',
}

export class ShowNotification implements ExtendedAction {
  readonly type = LayoutActionTypes.ShowNotification;

  constructor(public message: string, public translate: boolean = true) {
  }
}

export class ShowDevConsole implements ExtendedAction {
  readonly type = LayoutActionTypes.ShowDevConsole;
}

export class ToggleSidenav implements ExtendedAction {
  readonly type = LayoutActionTypes.ToggleSidenav;

  constructor(public showSidenav?: boolean) {
  }
}

export class SetSidenavMode implements ExtendedAction {
  readonly type = LayoutActionTypes.SetSidenavMode;

  constructor(public sidenavMode: string) {
  }
}

export class ToggleSidenavButton implements ExtendedAction {
  readonly type = LayoutActionTypes.ToggleSidenavButton;

  constructor(public showSidenavButton?: boolean) {
  }
}

export class ToggleSettingsButton implements ExtendedAction {
  readonly type = LayoutActionTypes.ToggleSettingsButton;

  constructor(public showSettingsButton?: boolean) {
  }
}

export class ToggleHomeButton implements ExtendedAction {
  readonly type = LayoutActionTypes.ToggleHomeButton;

  constructor(public showHomeButton?: boolean) {
  }
}
