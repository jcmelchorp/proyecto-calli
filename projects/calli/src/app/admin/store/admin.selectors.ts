import { createSelector } from '@ngrx/store';

import { AppState } from '../../state/app.state';


export const getAdminState = (state: AppState) => state.admin;

export const getUsersList = createSelector(
  getAdminState,
  (admin) => admin.usersList
);

export const getUsersListLoading = createSelector(
  getAdminState,
  (admin) => admin.usersListLoading
);

export const getSelectedUser = createSelector(
  getUsersList,
  (usersList: any, uid: string) =>
    usersList.filter((user: any) => user.uid === uid)[0]
);

export const getUserCourses = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userCourses.hasOwnProperty(uid)) {
      return admin.userCourses[uid];
    } else {
      return null;
    }
  }
);

export const getUserCustomers = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userCustomers.hasOwnProperty(uid)) {
      return admin.userCustomers[uid];
    } else {
      return null;
    }
  }
);

export const getUserCoursesLoading = createSelector(
  getAdminState,
  (admin) => admin.userCoursesLoading
);

export const getUserCustomersLoading = createSelector(
  getAdminState,
  (admin) => admin.userCustomersLoading
);
