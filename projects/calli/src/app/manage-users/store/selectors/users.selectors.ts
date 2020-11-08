import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UsersState } from '../users.state';

export const getUsersState = createFeatureSelector<UsersState>('users');
export const getUsers = createSelector(
  getUsersState,
  (users) => users.allUsers
);
export const getUser = createSelector(
  getUsersState,
  (users) => users.currentUser
);
