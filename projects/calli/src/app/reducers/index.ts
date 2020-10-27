import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export const storeFeatureKey = 'store';

export interface AppState {
  auth: AuthState;
  admin: AdminState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  admin: fromAdmin.adminReducer,
};

export function clearState(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action): AppState => {
    if (action.type === '[Auth] LOGOUT completed') {
      state = undefined;
    }
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
