import { UserAdmin } from '../models/user-admin.model';

export interface UsersState {
  allUsers: UserAdmin[];
  currentUser: UserAdmin;
}

export const usersInitialState: UsersState = {
  allUsers: [],
  currentUser: null
};
