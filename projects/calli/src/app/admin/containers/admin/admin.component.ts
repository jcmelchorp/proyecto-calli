import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, delay, take } from 'rxjs/operators';

import * as fromAdmin from '../../store/admin.actions';
import {
  getUsersList,
  getUserCourses,
  getSelectedUser,
  getUsersListLoading,
  getUserCoursesLoading,
  getUserCustomers,
  getUserCustomersLoading,
} from '../../store/admin.selectors';
import { AppState } from '../../../reducers/index';
import { User } from '../../../auth/models/user.model';
import { Course } from '../../../courses/models/course.model';
import { Customer } from '../../../customers/models/customer.model';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';


@Component({
  selector: 'calli-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  modalRef: any;
  modalService: any;
  constructor(
    private store: Store<AppState>,
    public dialogService: MatDialog
  ) { }

  users$: Observable<any>;
  userCourses$: Observable<Course[]>;
  userCustomers$: Observable<Customer[]>;
  usersListLoading$: Observable<boolean>;
  userCoursesLoading$: Observable<boolean>;
  userCustomersLoading$: Observable<boolean>;
  selectedUser$: Observable<any>;
  selectedUser: any;
  uid: any;

  ngOnInit(): void {
    this.users$ = this.store.pipe(
      select(getUsersList),
      delay(0),
      map((users: User[]) => {
        if (!users || (users && users.length === 0)) {
          this.store.dispatch(new fromAdmin.GetUsersList());
        }
        return users;
      })
    );
    this.usersListLoading$ = this.store.select(getUsersListLoading);
    this.userCoursesLoading$ = this.store.select(getUserCoursesLoading);
    this.userCustomersLoading$ = this.store.select(getUserCustomersLoading);
  }

  onUserSelect(user: any): void {
    this.uid = user.uid;
    this.selectedUser = user;
    this.selectedUser$ = this.store.select(getSelectedUser, user.uid);
    this.userCourses$ = this.store.select(getUserCourses, user.uid).pipe(
      map(courses => {
        if (courses && courses.length !== 0) {
          return courses;
        } else {
          return null;
        }
      })
    );
    this.userCustomers$ = this.store.select(getUserCustomers, user.uid).pipe(
      map(customers => {
        if (customers && customers.length !== 0) {
          return customers;
        } else {
          return null;
        }
      })
    );
  }

  onCoursesLoad(): void {
    this.store.dispatch(new fromAdmin.GetUserCourses({ uid: this.uid }));
  }

  onCustomersLoad(): void {
    this.store.dispatch(new fromAdmin.GetUserCustomers({ uid: this.uid }));
  }

  onDetailsClose(): void {
    this.selectedUser = null;
  }

  openCourseConfirmModal(course: Course): void {
    const dialogRef = this.dialogService.open(
      ConfirmModalComponent,
      { width: '400px', data: {} }
    );
    dialogRef.componentInstance.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserCourse({
              userId: this.selectedUser.key,
              courseId: course.id,
            })
          );
        }
      });
  }

  openCustomerConfirmModal(customer: Customer): void {
    const dialogRef = this.dialogService.open(
      ConfirmModalComponent,
      { width: '400px', data: {} }
    );
    dialogRef.componentInstance.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserCustomer({
              userId: this.selectedUser.key,
              customerId: customer.key
            })
          );
        }
      });
  }

  onCustomerDelete(customer: Customer): void {
    this.openCustomerConfirmModal(customer);
  }

  onCourseDelete(course: Course): void {
    this.openCourseConfirmModal(course);
  }

  addAdminPrivileges(user: any): void {
    this.store.dispatch(new fromAdmin.AddAdminPrivileges({ userId: user.key }));
  }

  removeAdminPrivileges(user: any): void {
    this.store.dispatch(
      new fromAdmin.RemoveAdminPrivileges({ userId: user.key })
    );
  }
}
