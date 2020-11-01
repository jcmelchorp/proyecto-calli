import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  faFacebook,
  faTwitter,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';

import { Store, select } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../../../reducers';
import * as actions from './../../store/auth.actions';
import { getError } from '../../store/auth.selectors';

@Component({
  selector: 'calli-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup | undefined;
  facebook = faFacebook;
  twitter = faTwitter;
  google = faGoogle;
  error$: Observable<string | null> | undefined;
  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.error$ = this.store.pipe(
      select(getError),
      map((error: any) => {
        if (
          error &&
          (error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password')
        ) {
          return 'Invalid login or password';
        } else {
          return null;
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  get email() {
    if (this.loginForm !== undefined) {
      return this.loginForm.get('email');
    } else {
      return null;
    }
  }
  // tslint:disable-next-line: typedef
  get password() {
    if (this.loginForm !== undefined) {
      return this.loginForm.get('password');
    } else {
      return null;
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(new actions.LoginRequested(this.loginForm.value));
    }
  }

  onGoogleLogin(): void {
    this.store.dispatch(new actions.SocialLogin());
  }
}
