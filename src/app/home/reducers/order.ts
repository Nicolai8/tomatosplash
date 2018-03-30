import { OrderActionTypes } from '../actions/order';
import { ExtendedAction } from '../../shared/actions/action';
import * as _ from 'lodash';
import { fromJS, Map } from 'immutable';
import { Order } from '../../../../models/order.model';

export type State = Map<string, any>;

const initialState: State = fromJS({
  orders: [],
  isLoading: false,
  isSaving: false,
  isSaved: false,
  pager: {
    page: 0,
    limit: 10,
    total: 0,
    pages: 1,
    thisPageLength: 0,
  },
  selected: new Order(),
});

export function reducer(
  state: State = initialState,
  action: ExtendedAction
): State {
  switch (action.type) {
    case OrderActionTypes.GetOrders:
      return state
        .set('isLoading', true);
    case OrderActionTypes.GetOrdersSuccess:
      return state
        .set('orders', action.orders)
        .set('isLoading', false)
        .setIn([ 'pager', 'page' ], action.pager.page - 1)
        .setIn([ 'pager', 'limit' ], action.pager.limit)
        .setIn([ 'pager', 'total' ], action.pager.total)
        .setIn([ 'pager', 'pages' ], action.pager.pages)
        .setIn([ 'pager', 'thisPageLength' ], action.orders.length);
    case OrderActionTypes.GetOrdersError:
      return state
        .set('isLoading', false);

    case OrderActionTypes.AddOrder:
      return state
        .set('isSaving', true)
        .set('isSaved', false);
    case OrderActionTypes.AddOrderSuccess:
      return state
        .set('isSaving', false)
        .set('isSaved', true)
        .set('selected', action.order);
    case OrderActionTypes.AddOrderError:
      return state
        .set('isSaving', false)
        .set('isSaved', false);

    case OrderActionTypes.EditOrder:
      return state
        .set('isSaving', true)
        .set('isSaved', false);
    case OrderActionTypes.EditOrderSuccess: {
      return state
        .set('isSaving', false)
        .set('isSaved', true)
        .set('selected', action.order);
    }
    case OrderActionTypes.EditOrderError:
      return state
        .set('isSaving', false)
        .set('isSaved', false);

    case OrderActionTypes.RemoveOrder:
      return state
        .set('isSaving', true);
    case OrderActionTypes.RemoveOrderSuccess: {
      return state
        .set('isSaving', false);
    }
    case OrderActionTypes.RemoveOrderError:
      return state
        .set('isSaving', false);

    case OrderActionTypes.SelectOrder:
      return state
        .set('selected', action.order);

    default:
      return state;
  }
}

export const getOrders = (state: State) => state.get('orders');
export const getIsLoading = (state: State) => state.get('isLoading');
export const getIsSaved = (state: State) => state.get('isSaved');
export const getIsSaving = (state: State) => state.get('isSaving');
export const getPager = (state: State) => state.get('pager').toJS();
export const getOrderById = (id: string) => (orders: Order[]) => _.find(orders, (order: Order) => order._id === id);
export const getSelectedOrder = (state: State) => state.get('selected');
