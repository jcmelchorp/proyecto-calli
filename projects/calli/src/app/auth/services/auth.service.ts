import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { GoogleApiService } from 'src/app/auth/services/google-api.service';

import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';

import { User } from '../models/user.model';
import { getIsLoggedIn } from './../store/auth.selectors';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  isTryingToLog$: Observable<boolean>;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private googleApiService: GoogleApiService
  ) {
    this.user$ = this.getAuthState().pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  createUser(user: User): Promise<DocumentReference> {
    return this.afs.collection('users').add({
      dispalyName: user.displayName,
      email: user.email,
      photoURL: user.photoUrl,
      providerId: user.providerId,
      isAdmin: user.isAdmin,
      isNewUser: user.isNewUser,
      isOnline: user.isOnline,
    });
  }

  /* updateUserData({ uid, displayName, email, providerId, photoUrl, isAdmin }: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data: User = { uid, displayName, email, providerId, photoUrl, isAdmin };
    return userRef.set(data, { merge: true });
  } */

  /** Firebase Database */
  register(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  updateProfile(newName: string, newPhotoUrl: string): any {
    const userProfile = this.getCurrentUser();
    if (userProfile) {
      return from(userProfile) as any;
    }
  }

  socialLogin(authProvider: string): Observable<firebase.auth.UserCredential> {
    this.isTryingToLog$ = of(true);
    let provider: any;
    if (authProvider === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
      return from(this.googleApiService.login());
    }

    if (authProvider === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    if (authProvider === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
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
    this.isTryingToLog$ = of(status);
    if (status) {
      this.db.database.ref().child('users/' + uid).onDisconnect().update({ isOnline: false });
    }
    return from(this.db.object('users/' + uid).update({ isOnline: status }));
  }

  checkUserRole(uid: string): Observable<unknown> {
    return this.db.object('admins/' + uid).valueChanges();
  }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  getCurrentUser(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }

  getAccessToken(): Promise<string> {
    return this.getCurrentUser().then((user) => {
      return user.getIdToken();
    });
  }
}
