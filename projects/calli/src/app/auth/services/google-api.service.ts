import { Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { from, Observable, Subscription } from 'rxjs';

import * as firebase from 'firebase/app';

import { environment } from '../../../environments/environment';
import { Course } from '../../courses/models/course.model';
declare var gapi;
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  user$: Observable<firebase.default.User>;
  courses$: Observable<Course[]>;
  teachers$: Observable<any[]>;
  courseList: Course[];

  constructor(public afAuth: AngularFireAuth) {
    this.initClient();
    /* this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user$ = afAuth.authState;
      }
    }); */
  }

  initClient(): void {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: environment.firebaseConfig.apiKey,
        clientId: environment.firebaseConfig.clientId,
        discoveryDocs: environment.firebaseConfig.discoveryDocs,
        scope: environment.firebaseConfig.scope,
      });
      gapi.client.load('classroom', 'v1', () => console.log('loaded courses'));
    });
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const authResponse = googleUser.getAuthResponse(true);
    const credential = firebase.default.auth.GoogleAuthProvider.credential(authResponse.id_token, authResponse.access_token);
    return this.afAuth.signInWithCredential(credential);
  }

  logout(): void {
    gapi.auth2.getAuthInstance().signOut().then(() => this.afAuth.signOut());
  }

  /**
   * Lists all course names and ids.
   * Print the names of the first 10 courses the user has access to. If
   * no courses are found an appropriate message is printed.
   */
  async listCourses2() {
    return await gapi.client.classroom.courses.list().then(response => {
      this.courses$ = response.result.courses;
    })
  }
  async listTeachers(cid: string) {
    return await gapi.client.classroom.courses.teachers.list({ courseId: cid }).then(response =>
      this.teachers$ = response.result.teachers
    );
  }

  async listCourses(): Promise<Course[]> {
    const response = await gapi.client.classroom.courses.list();
    const result = response.result;
    this.courses$ = result.courses;
    return result.courses;
    /* response.result.courses.map(c => {
      let ownerName = gapi.client.classroom.courses.teachers.get({ courseId: c.id, userId: c.ownerId }).profile.name.fullName;
      console.log(ownerName)
    }); */
  }



  /* async listCourses() {
   const courses = await gapi.client.classroom.courses.list();
   if (courses.length === 0) {
     console.log('No courses found.');
   } else {
     this.courses = courses.result.courses;
     const courseData = courses.result.map((course: Course) => {
        const ownerName = gapi.client.classroom.courses.teachers.get(
         course.id,
         course.ownerId
       ).profile.name.fullName;
       const data = `${ course.name } : ${ course.id } : ${ ownerName } `;
       console.log(course);
       return course;
     });
     return this.courses || courseData;
   }

 } */

  /* async listCourses() {
    const courses = gapi.client.classroom.courses.list();
    if (courses.length === 0) {
      console.log('No courses found.');
    } else {
      this.courses = courses.result.courses;

      const courseData = courses.result.courses.map((course: Course) => {
        const ownerName = gapi.client.classroom.courses.teachers.get(
          course.id,
          course.ownerId
        ).profile.name.fullName;
        const data = `${ course.name } : ${ course.id } : ${ ownerName } `;
        console.log(data);
        return data;
      });
      return courseData;
    }
  } */
  /* listCourses(callback, dispatch) {
    gapi.client.classroom.courses
      .list({ teacherId: gapi.auth2.getAuthInstance().currentUser.get()['El'] })
      .then((response) => {
        dispatch(callback(response.result.courses));
      });
  }
 */
}
