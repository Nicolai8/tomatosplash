import { ExtendedAction } from '../actions/action';
import { createFeatureSelector } from '@ngrx/store';

export interface State {
}

const initialState: State = {};

export function reducer(
  state: State = initialState,
  action: ExtendedAction
): State {
  switch (action.type) {
    default:
      return state;
  }
}

const getLayoutState = createFeatureSelector<State>('layout');

export default [
  getLayoutState,
];
