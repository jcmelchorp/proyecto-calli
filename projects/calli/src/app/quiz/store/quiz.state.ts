import { Quiz } from '../models/quiz.model';

export interface QuizState {
  quiz: Quiz[] | null;
  isLoading: boolean;
  error: any;
}

export const quizInitialState: QuizState = {
  quiz: null,
  isLoading: true,
  error: null,
};
