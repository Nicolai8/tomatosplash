import {
  ActionReducerMap, createFeatureSelector, createSelector,
} from '@ngrx/store';
import * as fromItem from './item';
import * as fromRoot from '../../shared/reducers';

export interface HomeState {
  item: fromItem.State;
}

export interface State extends fromRoot.State {
  home: HomeState;
}

export const reducers: ActionReducerMap<HomeState> = {
  item: fromItem.reducer,
};

export const getHomeState = createFeatureSelector<HomeState>('home');

export const getHomeItemState = createSelector(
  getHomeState,
  (state: HomeState) => state.item
);

export const getItems = createSelector(getHomeItemState, fromItem.getItems);
export const getIsLoading = createSelector(getHomeItemState, fromItem.getIsLoading);
export const getIsSaving = createSelector(getHomeItemState, fromItem.getIsSaving);
export const getIsSaved = createSelector(getHomeItemState, fromItem.getIsSaved);
export const getPager = createSelector(getHomeItemState, fromItem.getPager);
