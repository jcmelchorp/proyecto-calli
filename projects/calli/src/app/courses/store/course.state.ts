import { Course } from '../models/course.model';

export interface CoursesState {
  courses: Course[] | null;
  isLoading: boolean;
  error: string;
}

export const coursesInitialState: CoursesState = {
  courses: null,
  isLoading: true,
  error: null,
};
