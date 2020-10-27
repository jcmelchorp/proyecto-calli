import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'calli-courses-shell',
  templateUrl: './courses-shell.component.html',
  styleUrls: ['./courses-shell.component.scss'],
  animations: [
    trigger('fadeInOutAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(900)]),
    ]),
  ],
})
export class CoursesShellComponent implements OnInit, OnDestroy {
  menu = faBars;
  mediaSub: Subscription;
  deviceSm: boolean;
  deviceSize: string;

  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver
      .asObservable()
      .subscribe((result: MediaChange[]) => {
        this.deviceSize = result[0].mqAlias;
        this.deviceSm =
          this.deviceSize === 'sm' || this.deviceSize === 'xs' ? true : false;
      });
  }
  ngOnDestroy(): void {
    if (this.mediaSub !== undefined) {
      this.mediaSub.unsubscribe();
    }
  }
}
