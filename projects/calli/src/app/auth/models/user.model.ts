export interface User {
  uid: string;
  displayName: string;
  email: string;
  providerId: string;
  phoneNumber?: string;
  photoUrl: string;
  isNewUser?: boolean;
  isAdmin?: boolean;
  isOnline?: boolean;
}
