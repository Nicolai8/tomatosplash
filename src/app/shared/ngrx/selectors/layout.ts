import * as fromLayout from '../reducers/layout';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/layout';

const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

const getShowSidenav = createSelector(
  getLayoutState,
  (state: State) => state.showSidenav
);

export default [
  getLayoutState,
  getShowSidenav,
];
