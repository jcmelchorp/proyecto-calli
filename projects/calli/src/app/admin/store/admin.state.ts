
export interface AdminState {
  usersList: any[];
  usersListLoading: boolean;
  userCourses: any;
  userCoursesLoading: boolean;
  userCustomers: any;
  userCustomersLoading: boolean;
  error: any;
}

export const adminInitialState: AdminState = {
  usersList: [],
  usersListLoading: false,
  userCourses: {},
  userCoursesLoading: false,
  userCustomers: {},
  userCustomersLoading: false,
  error: null,
};
