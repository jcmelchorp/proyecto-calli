import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  faGlobeAmericas,
  faPlus,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Subject, Observable, from, empty, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { getIsLoading, getCourses } from '../../store/course.selectors';
import * as courseActions from '../../store/course.actions';
import { AppState } from '../../../reducers/app.state';

@Component({
  selector: 'calli-courses-firebase',
  templateUrl: './courses-firebase.component.html',
  styleUrls: ['./courses-firebase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesFirebaseComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  courseSub: Subscription;
  panelOpenState = false;
  plus = faPlus;
  question = faQuestionCircle;
  world = faGlobeAmericas;
  courses$: Observable<Course[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
    this.courses$ = this.store.pipe(
      select(getCourses),
      map((courses: Course[]) => {
        if (this.user && !courses) {
          this.store.dispatch(new courseActions.CoursesQuery());
        }
        return courses;
      })
    );
  }

  get user(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  /*  openAddCourseModal() {
    this.modalRef = this.modalService.show(CourseModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new course';

    this.modalRef.content.courseData.pipe(take(1)).subscribe( (courseData: Course) => {
      this.store.dispatch(new fromCourses.CourseAdded({ course: courseData }));
    });
  }

  openEditCourseModal(course: Course) {
    this.modalRef = this.modalService.show(CourseMo[dataSource]="courses"alComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit course';
    const courseCopy = {...course };
    this.modalRef.content.course = courseCopy;

    this.modalRef.content.courseData.pipe(take(1)).subscribe( (courseData: Course) => {
      this.store.dispatch(new fromCourses.CourseEdited({ course: courseData }));
    });
  }

  openConfirmModal(course: Course) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromCourses.CourseDeleted({ course }));
      }
    });
  } */

  onCourseDelete(course: Course) {
    //this.openConfirmModal(course);
  }

  onCourseEdit(course: Course) {
    //this.openEditCourseModal(course);
  }
}
