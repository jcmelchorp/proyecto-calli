import { FirebaseApp } from '@angular/fire';

export interface User extends firebase.UserInfo {
  /* uid: string;
  displayName: string;
  email: string;
  providerId: string;
  photoUrl: string; */
  isNewUser: boolean;
  isAdmin?: boolean;
  isOnline?: boolean;
}
export interface Credentials {
  email: string;
  password: string;
}
