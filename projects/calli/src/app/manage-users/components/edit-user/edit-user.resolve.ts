import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { take, filter, skip, map } from 'rxjs/operators';

import { FirebaseService } from '../../services/firebase.service';
import { UsersState } from '../../store/users.state';
import {
  LoadUser
} from '../../store/actions/users.actions';


@Injectable()
export class EditUserResolver implements Resolve<any> {
  item$: any;
  constructor(public firebaseService: FirebaseService, private store: Store<UsersState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      const userId = route.paramMap.get('id');
      this.store.dispatch(new LoadUser(userId));
      this.store.select('currentUser').pipe(
        skip(1),
        filter(data => !!data)
      )
        .subscribe(data => {
          resolve({ data, userId });

        });
    });
  }
}
