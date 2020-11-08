import { User } from '../../auth/models/user.model';

export interface UserAdmin extends User {
  name: string;
  surname: string;
  age: number;
  avatar: string;
}
