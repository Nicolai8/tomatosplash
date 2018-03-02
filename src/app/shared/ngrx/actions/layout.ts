import { ExtendedAction } from './action';

export enum LayoutActionTypes {
    OpenSidenav = '[Layout] Open Sidenav',
    CloseSidenav = '[Layout] Close Sidenav',
}

export class OpenSidenav implements ExtendedAction {
    readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements ExtendedAction {
    readonly type = LayoutActionTypes.CloseSidenav;
}
