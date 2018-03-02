import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConfig from '../reducers/config';
import { State } from '../reducers/config';

export const getConfigState = createFeatureSelector<fromConfig.State>('config');

export const getConfig = createSelector(
  getConfigState,
  (state: State) => state.config
);

export default [
  getConfigState,
  getConfig,
];
