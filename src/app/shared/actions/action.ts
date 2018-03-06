import { Action } from '@ngrx/store';

export interface ExtendedAction extends Action {
  [key: string]: any;
}
