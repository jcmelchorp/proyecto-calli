import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState } from '../../../reducers';
import { User } from '../../../auth/models/user.model';
import * as fromAuth from '../../../auth/store/auth.actions';
import { getUser } from '../../../auth/store/auth.selectors';


@Component({
  selector: 'calli-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store.select(getUser);
  }

  updateProfile(userData: any) {
    this.store.dispatch(new fromAuth.UpdateProfile(userData));
  }

  logoutUser(user: User) {
    this.store.dispatch(new fromAuth.LogoutRequested({ user }));
  }
}
