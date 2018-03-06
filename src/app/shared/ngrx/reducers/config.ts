import { ConfigActionTypes } from '../actions/config';
import { ExtendedAction } from '../actions/action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  config: { [key: string]: any };
}

const initialState: State = {
  config: {},
};

export function reducer(state: State = initialState,
                        action: ExtendedAction): State {
  switch (action.type) {
    case ConfigActionTypes.GetConfigSuccess:
      return {
        config: action.config,
      };

    default:
      return state;
  }
}

export const getConfigState = createFeatureSelector<State>('config');

export const getConfig = createSelector(
  getConfigState,
  (state: State) => state.config
);

export default [
  getConfigState,
  getConfig,
];
