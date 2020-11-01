import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { from, Observable, of, Subscription } from 'rxjs';

import * as firebase from 'firebase/app';

import { User } from '../models/user.model';
import { environment } from './../../../environments/environment.prod';
import { Course } from '../../courses/models/course.model';

declare var gapi;
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  user$: Observable<User>;
  courses$: Observable<Course[]>;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.initClient();
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.getAuthState().pipe(
      switchMap((user: User) => {
        // Logged in
        if (user) {
          console.log(user.uid);
          // console.log('user from constructor', user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          // console.log('returning null');
          return of(null);
        }
      })
    );
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



  getAuthState(): Observable<any> {
    // This is how we're getting into the firestoreDB
    return this.afAuth.authState;
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    return this.afAuth.signInWithCredential(credential);
  }
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }
  async emailSignin(value) {
    const provider = new firebase.auth.EmailAuthProvider();
    const credential = await this.afAuth.signInWithEmailAndPassword(value.email, value.password);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      isNewUser: user.isNewUser,
      isAdmin: user.isAdmin,
      isOnline: user.isOnline
    };
    return userRef.set(data, { merge: true });
  }


  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }


  createUser(user: User) {
    return this.afs.collection('users').add({
      id: user.uid,
      dispalyName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId,
    }).then(() => this.saveUser(user));
  }

  /** Firebase Database */
  register(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  emailLogin(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(uid: string): Observable<void> {
    this.updateOnlineStatus(uid, false);
    return from(this.afAuth.signOut());
  }
  saveUser(user: User) {
    const users = this.db.object('users/' + user.uid);
    return users.set(user);
  }
  updateOnlineStatus(uid: string, status: boolean): Observable<void> {
    if (status) {
      this.db.database
        .ref()
        .child('users/' + uid)
        .onDisconnect()
        .update({ isOnline: false });
    }
    return from(this.db.object('users/' + uid)
      .update({ isOnline: status }));
  }
  checkUserRole(uid: string): Observable<unknown> {
    return this.db.object('admins/' + uid).valueChanges();
  }


  getCurrentUser(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }

  getAccessToken(): Promise<string> {
    return this.getCurrentUser().then((user) => {
      return user.getIdToken();
    });
  }
  updateProfile(newName: string, newPhotoUrl: string): any {
    const userProfile = this.getCurrentUser();
    if (userProfile) {
      return from(userProfile) as any;
    }
  }
}
