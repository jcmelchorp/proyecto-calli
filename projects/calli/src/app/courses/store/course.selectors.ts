import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoursesState } from './course.state';

export const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCourses = createSelector(
  getCoursesState,
  (courses) => courses.courses
);

export const getIsLoading = createSelector(
  getCoursesState,
  (courses) => courses.isLoading
);

export const getError = createSelector(
  getCoursesState,
  (courses) => courses.error
);
