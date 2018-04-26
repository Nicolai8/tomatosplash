import { ItemActionTypes } from '../actions/item';
import { ExtendedAction } from '../../core/actions/action';
import * as _ from 'lodash';
import { updateArray } from '../../core/utils';
import { fromJS, Map } from 'immutable';

export type State = Map<string, any>;

const initialState: State = fromJS({
  items: [],
  isLoading: false,
  isSaving: false,
  isSaved: false,
});

export function reducer(
  state: State = initialState,
  action: ExtendedAction
): State {
  switch (action.type) {
    case ItemActionTypes.GetItems:
      return state
        .set('isLoading', true);
    case ItemActionTypes.GetItemsSuccess:
      return state
        .set('items', action.items)
        .set('isLoading', false);
    case ItemActionTypes.GetItemsError:
      return state
        .set('isLoading', false);

    case ItemActionTypes.AddItem:
      return state
        .set('isSaving', true)
        .set('isSaved', false);
    case ItemActionTypes.AddItemSuccess:
      return state
        .set('items', [ ...state.get('items'), action.item ])
        .set('isSaving', false)
        .set('isSaved', true);
    case ItemActionTypes.AddItemError:
      return state
        .set('isSaving', false)
        .set('isSaved', false);

    case ItemActionTypes.EditItem:
      return state
        .set('isSaving', true)
        .set('isSaved', false);
    case ItemActionTypes.EditItemSuccess: {
      const items = state.get('items');
      const itemIndex = _.findIndex(items, { _id: action.item._id });
      if (itemIndex >= 0) {
        return state
          .set('items', updateArray(items, itemIndex, action.item))
          .set('isSaving', false)
          .set('isSaved', true);
      }
      return state;
    }
    case ItemActionTypes.EditItemError:
      return state
        .set('isSaving', false)
        .set('isSaved', false);

    case ItemActionTypes.RemoveItem:
      return state
        .set('isSaving', true);
    case ItemActionTypes.RemoveItemSuccess: {
      return state
        .set('isSaving', false);
    }
    case ItemActionTypes.RemoveItemError:
      return state
        .set('isSaving', false);

    default:
      return state;
  }
}

export const getItems = (state: State) => state.get('items');
export const getIsLoading = (state: State) => state.get('isLoading');
export const getIsSaved = (state: State) => state.get('isSaved');
export const getIsSaving = (state: State) => state.get('isSaving');
