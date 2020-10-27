import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { from, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private db: AngularFireDatabase) { }
  selectedUser = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  getUsersList(): Observable<SnapshotAction<unknown>[]> {
    const usersRef = this.db.list('users');
    return usersRef.snapshotChanges();
  }

  getUserCourses(uid: string): Observable<SnapshotAction<unknown>[]> {
    const coursesRef = this.db.list('courses/' + uid);
    return coursesRef.snapshotChanges();
  }

  getUserCustomers(uid: string): Observable<SnapshotAction<unknown>[]> {
    const customersRef = this.db.list('customers/' + uid);
    return customersRef.snapshotChanges();
  }

  checkAdminRole(uid: string): Observable<unknown> {
    return this.db.object('admins/' + uid).valueChanges();
  }

  deleteUserCourse(uid: string, courseId: string): Observable<void> {
    return from(this.db.object('courses/' + uid + '/' + courseId).remove());
  }

  deleteUserCustomer(uid: string, customerId: string): Observable<void> {
    return from(this.db.object('customers/' + uid + '/' + customerId).remove());
  }

  addAdminPrivileges(uid: string): Observable<void> {
    const adminsRef = this.db.object('admins/' + uid);
    this.db.object('users/' + uid).update({ isAdmin: true });
    return from(adminsRef.set(true));
  }

  removeAdminPrivileges(uid: string): Observable<void> {
    this.db.object('users/' + uid).update({ isAdmin: false });
    return from(this.db.object('admins/' + uid).remove());
  }
}
