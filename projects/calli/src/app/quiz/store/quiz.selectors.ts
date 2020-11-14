import { createFeatureSelector, createSelector } from '@ngrx/store';

import { QuizState } from './quiz.state';

export const getQuizState = createFeatureSelector<QuizState>('quiz');

export const getQuiz = createSelector(
  getQuizState,
  (quiz) => quiz.quiz
);

export const getIsLoading = createSelector(
  getQuizState,
  (quiz) => quiz.isLoading
);

export const getError = createSelector(
  getQuizState,
  (quiz) => quiz.error
);
