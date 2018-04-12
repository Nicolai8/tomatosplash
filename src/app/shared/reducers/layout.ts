import { ExtendedAction } from '../actions/action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromJS } from 'immutable';
import { LayoutActionTypes } from '../actions/layout';

export interface State {
  showSidenav: boolean;
  sidenavMode: 'over' | 'push' | 'side';
  showSidenavButton: boolean;
  showSettingsButton: boolean;
  showHomeButton: boolean;
}

const initialState: State = fromJS({
  showSidenav: true,
  sidenavMode: 'side',
  showSidenavButton: false,
  showSettingsButton: false,
  showHomeButton: false,
});

export function reducer(
  state: State = initialState,
  action: ExtendedAction
): State {

  switch (action.type) {
    case LayoutActionTypes.ToggleSidenav: {
      const showSidenav = typeof action.showSidenav === 'undefined' ? !state.get('showSidenav') : action.showSidenav;

      return state.set('showSidenav', showSidenav);
    }

    case LayoutActionTypes.SetSidenavMode: {
      return state.set('sidenavMode', action.sidenavMode);
    }

    case LayoutActionTypes.ToggleSidenavButton: {
      return state.set('showSidenavButton', action.showSidenavButton);
    }

    case LayoutActionTypes.ToggleSettingsButton: {
      return state.set('showSettingsButton', action.showSettingsButton);
    }

    case LayoutActionTypes.ToggleHomeButton: {
      return state.set('showHomeButton', action.showHomeButton);
    }

    default:
      return state;
  }
}

export const getLayoutState = createFeatureSelector<State>('layout');
export const getShowSidenav = createSelector(
  getLayoutState,
  (state: State) => state.get('showSidenav')
);
export const getSidenavMode = createSelector(
  getLayoutState,
  (state: State) => state.get('sidenavMode')
);
export const getShowSidenavButton = createSelector(
  getLayoutState,
  (state: State) => state.get('showSidenavButton')
);
export const getShowSettingsButton = createSelector(
  getLayoutState,
  (state: State) => state.get('showSettingsButton')
);
export const getShowHomeButton = createSelector(
  getLayoutState,
  (state: State) => state.get('showHomeButton')
);

export default [
  getLayoutState,
  getShowSidenav,
  getSidenavMode,
  getShowSidenavButton,
  getShowSettingsButton,
];
