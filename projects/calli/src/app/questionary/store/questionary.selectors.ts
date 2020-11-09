import { createSelector, createFeatureSelector } from '@ngrx/store';

import { QuestionaryState } from './questionary.state';

export const getCustomersState = createFeatureSelector<QuestionaryState>('questionaries');

export const getCustomers = createSelector(
  getCustomersState,
  (questionary) => questionary.questionaries
);

export const getIsLoading = createSelector(
  getCustomersState,
  (questionary) => questionary.isLoading
);

export const getError = createSelector(
  getCustomersState,
  (questionary) => questionary.error
);
