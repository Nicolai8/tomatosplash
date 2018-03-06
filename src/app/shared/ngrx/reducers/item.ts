import { ItemActionTypes } from '../actions/item';
import { ExtendedAction } from '../actions/action';
import { Item } from '../../models/item.model';
import * as _ from 'lodash';
import { removeFromArray, updateArray } from '../../utils';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  items: Item[];
}

const initialState: State = {
  items: [],
};

export function reducer(
  state: State = initialState,
  action: ExtendedAction
): State {
  switch (action.type) {
    case ItemActionTypes.GetItemsSuccess:
      return {
        items: action.items,
      };

    case ItemActionTypes.AddItemSuccess:
      return {
        items: [ ...state.items, action.item ]
      };

    case ItemActionTypes.EditItemSuccess: {
      const itemIndex = _.findIndex(state.items, { _id: action.item._id });
      if (itemIndex >= 0) {
        return {
          items: updateArray(state.items, itemIndex, action.item)
        };
      }
      return {
        items: [ ...state.items, action.item ]
      };
    }

    case ItemActionTypes.RemoveItemSuccess: {
      const itemIndex = _.findIndex(state.items, { _id: action.item._id });
      if (itemIndex >= 0) {
        return {
          items: removeFromArray(state.items, itemIndex)
        };
      }
      return state;
    }

    default:
      return state;
  }
}

export const getItemState = createFeatureSelector<State>('item');

export const getItems = createSelector(
  getItemState,
  (state: State) => state.items
);

export default [
  getItemState,
  getItems,
];
