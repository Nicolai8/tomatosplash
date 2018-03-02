import { LayoutActionTypes } from '../actions/layout';
import { ExtendedAction } from '../actions/action';

export interface State {
    showSidenav: boolean;
}

const initialState: State = {
    showSidenav: false,
};

export function reducer(
    state: State = initialState,
    action: ExtendedAction
): State {
    switch (action.type) {
        case LayoutActionTypes.CloseSidenav:
            return {
                showSidenav: false,
            };

        case LayoutActionTypes.OpenSidenav:
            return {
                showSidenav: true,
            };

        default:
            return state;
    }
}
