import { ConfigActionTypes } from '../actions/config';
import { ExtendedAction } from '../actions/action';

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
    case ConfigActionTypes.SetConfigSuccess:
      return {
        config: action.config,
      };

    default:
      return state;
  }
}
