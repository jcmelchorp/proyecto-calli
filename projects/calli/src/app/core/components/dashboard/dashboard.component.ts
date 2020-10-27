import { User } from 'firebase';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, empty, of, from } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { GoogleApiService } from '../../../auth/services/google-api.service';
import { Course } from '../../../courses/models/course.model';
import { CourseDbService } from '../../../courses/services/course-db.service';
import { AppState } from '../../../reducers';


@Component({
  selector: 'calli-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Input() user: User;
  /*   itemSub: Subscription;
  boardSub: Subscription;
  */
  coursesSub: Subscription;
  courses: Course[];

  constructor(
    //private boardService: BoardService, //private itemService: ItemService,
    private store: Store<AppState>,
    private courseService: CourseDbService,
    public googleApiService: GoogleApiService
  ) { }

  ngOnInit(): void {
    //this.initCourses();
    /* this.initItems();
    this.initBoards(); */
  }

  ngOnDestroy(): void {
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
    /* if (this.itemSub) {
      this.itemSub.unsubscribe();
    }

    if (this.boardSub) {
      this.boardSub.unsubscribe();
    } */
  }

  /* initCourses(): void {
    this.coursesSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: User) => {
          if (user) {
            return this.courseService.getAll(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((courses) => {
        if (courses.length === 0) {
          this.googleApiService.listCourses();
          this.courseService.addCourses(this.courses);
        }
      });
  } */

  /*  initItems() {
    this.itemSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.itemService.getAll(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((items) => {
        if (items.length === 0) {
          //this.itemService.addItems(this.items);
        }
      });
  } */

  /* initBoards() {
    this.boardSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.boardService.getAll( user.uid );
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((board) => {
        if (board.length === 0) {
          this.boardService.addCustomers(this.board);
        }
      });
  }  */
}
