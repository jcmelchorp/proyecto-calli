import { Injectable, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import * as fromCourses from './../store/course.actions';
import { Course } from '../models/course.model';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { CourseDbService } from '../services/course-db.service';
import { AppState } from 'src/app/state/app.state';

@Injectable()
export class CourseEffect {
  constructor(
    private actions$: Actions,
    private courseDbService: CourseDbService,
    private store: Store<AppState>
  ) { }

  @Effect()
  query$ = this.actions$.pipe(
    ofType<fromCourses.CoursesQuery>(
      fromCourses.CourseActionTypes.COURSES_QUERY
    ),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => {
      return this.courseDbService.getAll(user.uid).pipe(
        map((data: any) => {
          const coursesData: Course[] = data.map((res: any) => {
            const key = res.payload.key;
            const course: Course = res.payload.val();
            return {
              key: key || null,
              id: course.id,
              name: course.name,
              section: course.section,
              descriptionHeading: course.descriptionHeading,
              description: course.description,
              room: course.room,
              ownerId: course.ownerId,
              creationTime: course.creationTime,
              updateTime: course.updateTime,
              enrollmentCode: course.enrollmentCode,
              courseState: course.courseState,
              alternateLink: course.alternateLink,
              teacherGroupEmail: course.teacherGroupEmail,
              courseGroupEmail: course.courseGroupEmail,
              guardiansEnabled: course.guardiansEnabled,
              calendarId: course.calendarId,
              teacherFolder: course.teacherFolder,
              courseMaterialSets: course.courseMaterialSets,
            };
          });
          return new fromCourses.CoursesLoaded({ courses: coursesData });
        }),
        catchError((error) => of(new fromCourses.CoursesError({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(fromCourses.CourseActionTypes.COURSE_ADDED),
    map((action: fromCourses.CourseAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.courseDbService.addCourse(payload.course, user.uid)
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(fromCourses.CourseActionTypes.COURSE_DELETED),
    map((action: fromCourses.CourseDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.courseDbService.delete(payload.course, user.uid)
    )
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(fromCourses.CourseActionTypes.COURSE_EDITED),
    map((action: fromCourses.CourseEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.courseDbService.update(payload.course, user.uid)
    )
  );
}
