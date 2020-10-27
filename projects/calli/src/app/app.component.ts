import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange } from '@angular/flex-layout/core/typings/media-change';
import { MediaObserver } from '@angular/flex-layout/core/typings/media-observer';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { Subscription, Observable } from 'rxjs';
import { User } from './auth/models/user.model';
import * as fromAuth from './auth/store/auth.actions';
import { getIsAdmin, getIsLoading, getIsLoggedIn, getUser } from './auth/store/auth.selectors';
import { AppState } from './reducers';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'calli-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  mediaSub: Subscription;
  deviceXs: boolean;
  user$: Observable<firebase.User | null>;
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
      title: 'Calli',
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
