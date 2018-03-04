import * as fromLayout from '../reducers/layout';
import { createFeatureSelector } from '@ngrx/store';

const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export default [
  getLayoutState,
];
