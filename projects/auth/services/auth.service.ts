import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

import * as firebase from 'firebase/app';

import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from './../../../environments/environment';

import { GoogleApiService } from './google-api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private googleApiService: GoogleApiService

  ) {
    //this.initClient();
    this.user$ = this.getAuthState()/*.pipe(
      switchMap((user) => {
        if (user) {
          // isLoggedIn = true
          return this.afs.collection('users').doc<User>(`${user.uid}`).valueChanges();
        } else {
          // isLoggedIn = false
          return of(null);
        }
      }))*/;
  }
  /** Observable of authentication state; as of Firebase 4.0 this is only triggered via sign-in/out. */
  getAuthState(): Observable<firebase.default.User | null> {
    return this.afAuth.authState;
  }
  createUser(user: User) {
    return this.afs.collection('users').add({
      uid: user.uid,
      dispalyName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId,
      isAdmin: user.isAdmin,
      isNewUser: user.isNewUser,
      isOnline: user.isOnline,
    }).then(() => this.saveUser(user));
  }
  /** Firebase Database */
  register(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  emailLogin(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  updateProfile(newName: string, newPhotoUrl: string): any {
    const userProfile = this.user$.subscribe(() => {
      return from(this.db.database.ref().child('users/' + ``).update({
        displayName: newName, photoUrl: newPhotoUrl
      }));
    });
  }

  socialLogin(authProvider: string): Observable<firebase.default.auth.UserCredential> {
    let provider: any;
    console.log(authProvider);
    if (authProvider === 'google') {
      return from(this.googleApiService.login());
    }

    if (authProvider === 'facebook') {
      provider = new firebase.default.auth.FacebookAuthProvider();
    }

    if (authProvider === 'twitter') {
      provider = new firebase.default.auth.TwitterAuthProvider();
    }
    return from(this.afAuth.signInWithPopup(provider));
  }

  logout(uid: string): Observable<void> {
    this.updateOnlineStatus(uid, false);
    return from(this.afAuth.signOut());
  }

  saveUser(user: User): Promise<void> {
    this.createUser(user);
    const users = this.db.object('users/' + user.uid);
    return users.set(user);
  }

  updateOnlineStatus(uid: string, status: boolean): Observable<void> {
    if (status) {
      this.db.database.ref().child('users/' + uid).onDisconnect().update({ isOnline: false });
    }
    return from(this.db.object('users/' + uid).update({ isOnline: status }));
  }

  checkUserRole(uid: string): Observable<unknown> {
    return this.db.object('admins/' + uid).valueChanges();
  }



  getCurrentUser(): Promise<firebase.default.User> {
    return this.afAuth.currentUser;
  }

  getAccessToken(): Promise<string> {
    return this.getCurrentUser().then((user) => {
      return user.getIdToken();
    });
  }

}
