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
  userId: string;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private googleApiService: GoogleApiService
  ) {
    this.user$ = this.getAuthState().pipe(
      switchMap((user) => {
        if (user) {
          this.userId = user.uid;
          console.log(this.userId)
          return this.afs.collection('users').doc<User>(`${this.userId}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  createUser(user: User): Promise<void> {
    return this.afs.collection('users').add({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId,
      isAdmin: false,
    }).then((docRef) => {
      this.saveUser(user);
      console.log('Document successfully written with ID: ', docRef.id);
    }).catch((err) => {
      console.error('Error writing document: ', err);
    });
  }

  saveUser(user: User): Promise<void> {
    const users = this.db.object(`users/${user.uid}`);
    return users.set(user);
  }

  updateUserData(user) {
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
  /* updateUserData({ uid, displayName, email, providerId, photoURL, isAdmin }: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data: User = { uid, displayName, email, providerId, photoURL, isAdmin };
    return userRef.set(data, { merge: true });
  } */

  /** Firebase Database */
  register(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Observable<firebase.default.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  updateProfile(phoneNumber: string, displayName: string, photoURL: string): any {
    return this.db.database.ref('users').child(`${this.userId}`).update({
      phoneNumber,
      displayName,
      photoURL
    });
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
