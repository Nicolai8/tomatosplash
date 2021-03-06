import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from '../utils';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
/*import { storeFreeze } from 'ngrx-store-freeze';*/

import * as fromLayout from './layout';
import * as fromConfig from './config';
import * as fromPrint from './print';
import { environment } from '../../../environments/environment';

export interface State {
  layout: fromLayout.State;
  config: fromConfig.State;
  print: fromPrint.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<any> = {
  layout: fromLayout.reducer,
  config: fromConfig.reducer,
  print: fromPrint.reducer,
  router: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? <MetaReducer<State>[]>[ logger/*, storeFreeze*/ ]
  : [];
