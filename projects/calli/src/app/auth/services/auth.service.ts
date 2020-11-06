import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';

import { User } from '../models/user.model';
import { GoogleApiService } from '../services/google-api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private googleApiService: GoogleApiService
  ) {
    this.user$ = this.getAuthState().pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.collection('users').doc<User>(`${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  createUser(user: User) {
    return this.afs.collection('users').add({
      uid: user.uid,
      dispalyName: user.displayName,
      email: user.email,
      photoURL: user.photoUrl,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId,
      isAdmin: user.isAdmin,
      isNewUser: user.isNewUser,
      isOnline: user.isOnline,
    }).then(() => this.saveUser(user));
  }

  /* updateUserData({ uid, displayName, email, providerId, photoUrl, isAdmin }: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data: User = { uid, displayName, email, providerId, photoUrl, isAdmin };
    return userRef.set(data, { merge: true });
  } */

  /** Firebase Database */
  register(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  updateProfile(newName: string, newPhotoUrl: string): any {
    this.db.database.ref().child('users/' + ``).onDisconnect().update({ isOnline: false });
    const userProfile = this.getCurrentUser();
    if (userProfile) {
      return from(userProfile) as any;
    }
  }

  socialLogin(authProvider: string) {
    let provider: any;
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

  getAuthState(): Observable<firebase.default.User> {
    return this.afAuth.authState;
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
