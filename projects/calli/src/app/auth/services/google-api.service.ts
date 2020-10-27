import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { Course } from '../../courses/models/course.model';
import { environment } from 'src/environments/environment';
import { Injectable, Output } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
declare var gapi;
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  user$: Observable<firebase.User>;
  courses$: Observable<Course[]>;
  calendarItems: any[];
  constructor(public afAuth: AngularFireAuth) {
    this.initClient();
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user$ = afAuth.authState;
      }
    });
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
    const token = googleUser.getAuthResponse().id_token;
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    return this.afAuth.signInWithCredential(credential);
  }

  logout(): void {
    this.afAuth.signOut();
  }

  /**
   * Lists all course names and ids.
   * Print the names of the first 10 courses the user has access to. If
   * no courses are found an appropriate message is printed.
   */
  listCourses() {
    this.courses$ = gapi.client.classroom.courses.list().then(response => {
      return from<Course[]>(response.result.courses);
    });
  }
  async listTeachers(courseId: number) {
    return await gapi.client.classroom.teachers.list({ courseId });
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
