import { Action } from '@ngrx/store';

import { Quiz } from '../models/quiz.model';

export enum QuizActionTypes {
  QUIZ_QUERY = '[Quiz] Query',
  QUIZ_LOADED = '[Quiz] Fetched',

  QUIZ_ADDED = '[Quiz] Added',
  QUIZ_EDITED = '[Quiz] Edited',
  QUIZ_DELETED = '[Quiz] Deleted',

  QUIZ_ERROR = '[Quiz] Error',
}

export class QuizQuery implements Action {
  readonly type = QuizActionTypes.QUIZ_QUERY;
}

export class QuizLoaded implements Action {
  readonly type = QuizActionTypes.QUIZ_LOADED;

  constructor(public payload: { quiz: Quiz[] }) { }
}

export class QuizAdded implements Action {
  readonly type = QuizActionTypes.QUIZ_ADDED;

  constructor(public payload: { quiz: Quiz }) { }
}

export class QuizEdited implements Action {
  readonly type = QuizActionTypes.QUIZ_EDITED;

  constructor(public payload: { quiz: Quiz }) { }
}

export class QuizDeleted implements Action {
  readonly type = QuizActionTypes.QUIZ_DELETED;

  constructor(public payload: { quiz: Quiz }) { }
}

export class QuizError implements Action {
  readonly type = QuizActionTypes.QUIZ_ERROR;

  constructor(public payload: { error: any }) { }
}

export type QuizActions =
  | QuizQuery
  | QuizLoaded
  | QuizAdded
  | QuizEdited
  | QuizDeleted
  | QuizError;
