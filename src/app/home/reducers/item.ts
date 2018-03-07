import { ItemActionTypes } from '../actions/item';
import { ExtendedAction } from '../../shared/actions/action';
import * as _ from 'lodash';
import { removeFromArray, updateArray } from '../../shared/utils';
import { Map } from 'immutable';

export type State = Map<string, any>;

const initialState: State = Map({
  items: [],
  isLoading: false,
  pager: {
    pageNumber: 1,
    pageSize: 25,
    total: 0,
  }
});

export function reducer(
  state: State = initialState,
  action: ExtendedAction
): State {
  switch (action.type) {
    case ItemActionTypes.GetItems:
      return state.set('isLoading', true);
    case ItemActionTypes.GetItemsSuccess:
      return state.set('items', action.items)
        .set('isLoading', false)
        .setIn([ 'pager', 'pageNumber' ], action.pager.pageNumber)
        .setIn([ 'pager', 'pageSize' ], action.pager.pageSize)
        .setIn([ 'pager', 'total' ], action.total);
    case ItemActionTypes.GetItemsError:
      return state.set('isLoading', false);

    case ItemActionTypes.AddItemSuccess:
      return state.set('items', [ ...state.get('items'), action.item ]);

    case ItemActionTypes.EditItemSuccess: {
      const items = state.get('items');
      const itemIndex = _.findIndex(items, { _id: action.item._id });
      if (itemIndex >= 0) {
        return state.set('items', updateArray(items, itemIndex, action.item));
      }
      return state.set('items', [ ...items, action.item ]);
    }

    case ItemActionTypes.RemoveItemSuccess: {
      const items = state.get('items');
      const itemIndex = _.findIndex(items, { _id: action.item._id });
      if (itemIndex >= 0) {
        return state.set('items', removeFromArray(items, itemIndex));
      }
      return state;
    }

    default:
      return state;
  }
}

export const getItems = (state: State) => state.get('items');

export const getIsLoading = (state: State) => state.get('isLoading');

export const getPager = (state: State) => state.get('pager');
