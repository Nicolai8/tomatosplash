import { LayoutActionTypes } from '../actions/layout';
import { ExtendedAction } from '../actions/action';

export interface State {
}

const initialState: State = {
};

export function reducer(
    state: State = initialState,
    action: ExtendedAction
): State {
    switch (action.type) {
        default:
            return state;
    }
}
