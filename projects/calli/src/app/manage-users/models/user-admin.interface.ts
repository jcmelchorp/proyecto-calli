import { User } from '../../auth/models/user.model';

export interface IUserAdmin extends User {
  name: string;
  surname: string;
  age: number;
  avatar: string;
}
