import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { Store } from '@ngrx/store';

import { Subscription, Observable } from 'rxjs';

import { AppState } from './state/app.state';
import { User } from './auth/models/user.model';
import * as fromAuth from './auth/store/auth.actions';
import { getIsAdmin, getIsLoading, getIsLoggedIn, getUser } from './auth/store/auth.selectors';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'calli-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Calli';
  mediaSub: Subscription;
  deviceXs: boolean;
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    public mediaObserver: MediaObserver,
    public seoService: SeoService
  ) { }
  ngOnInit(): void {
    this.seoService.generateTags({
      title: this.title,
      description: 'Aplicación de dedicada a la enseñanza de las matemáticas',
      image: 'https://proyecto-calli.web.app/'
    });
    this.user$ = this.store.select(getUser);
    this.isLoggedIn$ = this.store.select(getIsLoggedIn);
    this.isLoading$ = this.store.select(getIsLoading);
    this.isAdmin$ = this.store.select(getIsAdmin);
    this.mediaSub = this.mediaObserver
      .asObservable()
      .subscribe((result: MediaChange[]) => {
        this.deviceXs = result[0].mqAlias === 'xs' ? true : false;
      });
  }
  ngOnDestroy(): void {
    if (this.mediaSub !== undefined) {
      this.mediaSub.unsubscribe();
    }
  }
  onLogout(user: User): void {
    this.store.dispatch(new fromAuth.LogoutRequested({ user }));
  }
}
