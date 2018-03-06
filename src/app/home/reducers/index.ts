import {
  ActionReducerMap,
} from '@ngrx/store';
import * as fromItem from './item';
import * as fromRoot from '../../shared/reducers/index';

export interface HomeState {
  item: fromItem.State;
}

export interface State extends fromRoot.State {
  home: HomeState;
}

export const reducers: ActionReducerMap<HomeState> = {
  item: fromItem.reducer,
};
