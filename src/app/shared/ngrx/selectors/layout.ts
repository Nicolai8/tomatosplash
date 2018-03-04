import * as fromLayout from '../reducers/layout';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/layout';

const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export default [
  getLayoutState,
];
