export interface User extends firebase.default.UserInfo {
  uid: string;
  displayName: string;
  email: string;
  providerId: string;
  photoURL: string;
  phoneNumber: string;
  isNewUser?: boolean;
  isAdmin?: boolean;
  isOnline?: boolean;
}
export interface Credentials {
  email: string;
  password: string;
}
