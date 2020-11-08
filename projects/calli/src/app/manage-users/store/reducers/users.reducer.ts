import { Action } from '@ngrx/store';

import { usersInitialState, UsersState } from '../users.state';
import {
  UsersActionTypes,
  UsersActions,
  SetUsers,
  SetUser,
  DeleteUserSuccess,
  UpdateUserSuccess,
  AddUserSuccess
} from '../actions/users.actions';

export function usersReducer(state = usersInitialState, action: UsersActions): UsersState {
  switch (action.type) {
    case UsersActionTypes.SetUsers:
      return handleSetUsers(state, action);
    case UsersActionTypes.SetUser:
      return handleSetUser(state, action);
    case UsersActionTypes.DeleteUser_success:
      return handleDeleteUserSuccess(state, action);
    case UsersActionTypes.UpdateUser_success:
      return handleUpdateUserSuccess(state, action);
    case UsersActionTypes.AddUser_success:
      return handleAddUserSuccess(state, action);
    default:
      return state;
  }
}

function handleSetUsers(state: UsersState, action: SetUsers): UsersState {
  return {
    ...state,
    allUsers: action.payload
  }
}

function handleSetUser(state: UsersState, action: SetUser): UsersState {
  return {
    ...state,
    currentUser: action.payload
  };
}

function handleDeleteUserSuccess(state: UsersState, action: DeleteUserSuccess): UsersState {
  return {
    ...state,
    currentUser: null
  };
}

function handleUpdateUserSuccess(state: UsersState, action: UpdateUserSuccess): UsersState {
  return {
    ...state,
    currentUser: null
  };
}

function handleAddUserSuccess(state: UsersState, action: AddUserSuccess): UsersState {
  return {
    ...state,
    currentUser: null
  };
}

