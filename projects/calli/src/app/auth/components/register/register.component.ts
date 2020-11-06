import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as actions from './../../store/auth.actions';
import { getError } from '../../store/auth.selectors';
import { AppState } from '../../../state/app.state';

@Component({
  selector: 'calli-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | undefined;
  hide = true;
  error$: Observable<string | null> | undefined;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.error$ = this.store.pipe(
      select(getError),
      map((error: any) => {
        if (error) {
          if (error.code === 'auth/weak-password') {
            return error.message;
          } else if (error.code === 'auth/email-already-in-use') {
            return 'User with this email address already exist';
          }
        } else {
          return null;
        }
      })
    );
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  onRegister() {
    if (this.registerForm !== undefined) {
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      if (this.registerForm.valid) {
        this.store.dispatch(
          new actions.RegisterRequested({ username, email, password })
        );
      }
    }
  }
}
