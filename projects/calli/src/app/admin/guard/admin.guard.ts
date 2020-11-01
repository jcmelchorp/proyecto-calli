import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { take, switchMap, map, catchError } from 'rxjs/operators';

import { AdminService } from '../services/admin.service';
import { SnackService } from './../../shared/services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private adminService: AdminService,
    private afAuth: AngularFireAuth,
    private snackBar: SnackService
  ) { }


  canActivate(): Observable<boolean> | boolean {

    return this.afAuth.authState
      .pipe(
        take(1),
        switchMap((user: any) => {
          if (!user) {
            this.router.navigateByUrl('/login');
            return of(false);
          }
          return this.adminService.checkAdminRole(user.uid)
            .pipe(
              map((isAdmin) => {
                if (isAdmin) {
                  return true;
                } else {
                  this.router.navigateByUrl('');
                  return false;
                }
              }),
              catchError(() => {
                this.snackBar.authError();
                this.router.navigateByUrl('');
                return of(false);
              })
            );
        }),
      );
  }
}
