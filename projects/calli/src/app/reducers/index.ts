import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import * as fromAdmin from '../admin/store/admin.reducer';
import { AdminState } from '../admin/store/admin.state';
import * as fromAuth from '../auth/store/auth.reducer';
import { AuthState } from '../auth/store/auth.state';


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


export const metaReducers: MetaReducer<AppState>[] = [clearState];
