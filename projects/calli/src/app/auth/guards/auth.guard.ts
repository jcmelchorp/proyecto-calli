import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';

import { GoogleApiService } from './../services/google-api.service';
import { SnackService } from '../../shared/services/snack.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private googleApiService: GoogleApiService,
    private afAuth: AngularFireAuth,
    private snack: SnackService
  ) { }



  canActivate(): Observable<boolean> {

    return this.afAuth.authState
      .pipe(
        take(1),
        switchMap((user) => {
          if (!user) {
            this.router.navigateByUrl('/login');
            return of(false);
          }
          return of(true);
        }),
        catchError(() => {
          this.snack.authError();
          this.router.navigateByUrl('/login');
          return of(false);
        })
      );
  }
}
