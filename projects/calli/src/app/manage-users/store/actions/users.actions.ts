import { Action } from '@ngrx/store';

import { IUserAdmin } from '../../models/user-admin.interface';

export enum UsersActionTypes {
  LoadUsers = '[User] Load Users',
  SetUsers = '[User] Set Users',
  LoadUser = '[User] Load User',
  SetUser = '[User] Set User',
  DeleteUser = '[User] Delete User',
  DeleteUser_success = '[User] Delete User Success',
  UpdateUser = '[User] Update User',
  UpdateUser_success = '[User] Update User Success',
  AddUser = '[User] Add User',
  AddUser_success = '[User] Add User Success'
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

export class SetUsers implements Action {
  readonly type = UsersActionTypes.SetUsers;

  constructor(public payload: IUserAdmin[]) { }
}

export class LoadUser implements Action {
  readonly type = UsersActionTypes.LoadUser;

  constructor(public payload: string) { }
}

export class SetUser implements Action {
  readonly type = UsersActionTypes.SetUser;

  constructor(public payload: IUserAdmin) { }
}

export class DeleteUserSuccess implements Action {
  readonly type = UsersActionTypes.DeleteUser_success;
}

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DeleteUser;

  constructor(public payload: string) { }

}

export class AddUserSuccess implements Action {
  readonly type = UsersActionTypes.AddUser_success;
}

export class AddUser implements Action {
  readonly type = UsersActionTypes.AddUser;

  constructor(public payload: IUserAdmin, public avatar: string) { }

}

export class UpdateUserSuccess implements Action {
  readonly type = UsersActionTypes.UpdateUser_success;
}

export class UpdateUser implements Action {
  readonly type = UsersActionTypes.UpdateUser;

  constructor(public payload: IUserAdmin) { }

}

export type UsersActions = LoadUsers | SetUsers | LoadUser | SetUser |
  DeleteUser | DeleteUserSuccess | UpdateUser | UpdateUserSuccess | AddUser | AddUserSuccess;
