import { CoursesActions, CourseActionTypes } from './course.actions';
import { coursesInitialState, CoursesState } from './course.state';

export function courseReducer(
  state = coursesInitialState,
  action: CoursesActions
): CoursesState {
  switch (action.type) {
    case CourseActionTypes.COURSES_QUERY: {
      return { ...state, isLoading: true, error: null };
    }

    case CourseActionTypes.COURSE_LOADED: {
      return { ...state, courses: action.payload.courses, isLoading: false };
    }

    case CourseActionTypes.COURSE_ERROR: {
      return { ...state, isLoading: false, error: action.payload.error };
    }

    default:
      return state;
  }
}
