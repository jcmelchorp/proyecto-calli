import { Action } from '@ngrx/store';
import { Course } from '../models/course.model';

export enum CourseActionTypes {
  COURSES_QUERY = '[Courses] Courses query',
  COURSE_LOADED = '[Courses] Courses loaded',
  COURSE_ADDED = '[Courses] Course added',
  COURSE_EDITED = '[Courses] Course edited',
  COURSE_ERROR = '[Courses] Courses error',
  COURSE_DELETED = '[Courses] Courses deleted',
}
export class CoursesQuery implements Action {
  readonly type = CourseActionTypes.COURSES_QUERY;
}

export class CoursesLoaded implements Action {
  readonly type = CourseActionTypes.COURSE_LOADED;

  constructor(public payload: { courses: Course[] }) {}
}

export class CourseAdded implements Action {
  readonly type = CourseActionTypes.COURSE_ADDED;

  constructor(public payload: { course: Course }) {}
}

export class CourseEdited implements Action {
  readonly type = CourseActionTypes.COURSE_EDITED;

  constructor(public payload: { course: Course }) {}
}

export class CourseDeleted implements Action {
  readonly type = CourseActionTypes.COURSE_DELETED;

  constructor(public payload: { course: Course }) {}
}

export class CoursesError implements Action {
  readonly type = CourseActionTypes.COURSE_ERROR;

  constructor(public payload: { error: string }) {}
}

export type CoursesActions =
  | CoursesQuery
  | CoursesLoaded
  | CourseAdded
  | CourseEdited
  | CourseDeleted
  | CoursesError;
