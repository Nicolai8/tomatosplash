import {
  ActionReducerMap, createFeatureSelector, createSelector,
} from '@ngrx/store';
import * as fromItem from './item';
import * as fromOrder from './order';
import * as fromRoot from '../../shared/reducers';

export interface HomeState {
  item: fromItem.State;
  order: fromOrder.State;
}

export interface State extends fromRoot.State {
  home: HomeState;
}

export const reducers: ActionReducerMap<HomeState> = {
  item: fromItem.reducer,
  order: fromOrder.reducer,
};

export const getHomeState = createFeatureSelector<HomeState>('home');

export const getHomeItemState = createSelector(
  getHomeState,
  (state: HomeState) => state.item
);

export const getItems = createSelector(getHomeItemState, fromItem.getItems);
export const getItemsIsLoading = createSelector(getHomeItemState, fromItem.getIsLoading);
export const getItemsIsSaving = createSelector(getHomeItemState, fromItem.getIsSaving);
export const getItemsIsSaved = createSelector(getHomeItemState, fromItem.getIsSaved);

export const getHomeOrderState = createSelector(
  getHomeState,
  (state: HomeState) => state.order
);
export const getOrders = createSelector(getHomeOrderState, fromOrder.getOrders);
export const getOrdersIsLoading = createSelector(getHomeOrderState, fromOrder.getIsLoading);
export const getOrdersIsSaving = createSelector(getHomeOrderState, fromOrder.getIsSaving);
export const getOrdersIsSaved = createSelector(getHomeOrderState, fromOrder.getIsSaved);
export const getOrdersPager = createSelector(getHomeOrderState, fromOrder.getPager);
export const getOrderById = (id: string) => createSelector(getOrders, fromOrder.getOrderById(id));
export const getSelectedOrder = createSelector(getHomeOrderState, fromOrder.getSelectedOrder);
