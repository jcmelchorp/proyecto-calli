import { Action } from '@ngrx/store';

import { Questionary } from '../models/questionary.model';


export enum QuestionariesActionTypes {
  QUESTIONARIES_QUERY = '[Questionaries] Query',
  QUESTIONARIES_LOADED = '[Questionaries] Fetched',

  QUESTIONARIES_ADDED = '[Questionaries] Added',
  QUESTIONARIES_EDITED = '[Questionaries] Edited',
  QUESTIONARIES_DELETED = '[Questionaries] Deleted',

  QUESTIONARIES_ERROR = '[Questionaries] Error',
  QUESTIONARY_QUERY = '[Questioinaries] Query'
}

export class QuestionariesQuery implements Action {
  readonly type = QuestionariesActionTypes.QUESTIONARIES_QUERY;
}

export class QuestionariesLoaded implements Action {
  readonly type = QuestionariesActionTypes.QUESTIONARIES_LOADED;

  constructor(public payload: { questionarys: Questionary[] }) { }
}

export class QuestionariesAdded implements Action {
  readonly type = QuestionariesActionTypes.QUESTIONARIES_ADDED;

  constructor(public payload: { questionary: Questionary }) { }
}

export class QuestionariesEdited implements Action {
  readonly type = QuestionariesActionTypes.QUESTIONARIES_EDITED;

  constructor(public payload: { questionary: Questionary }) { }
}

export class QuestionariesDeleted implements Action {
  readonly type = QuestionariesActionTypes.QUESTIONARIES_DELETED;

  constructor(public payload: { questionary: Questionary }) { }
}

export class QuestionariesError implements Action {
  readonly type = QuestionariesActionTypes.QUESTIONARIES_ERROR;

  constructor(public payload: { error: any }) { }
}

export type QuestionariesActions =
  | QuestionariesQuery
  | QuestionariesLoaded
  | QuestionariesAdded
  | QuestionariesEdited
  | QuestionariesDeleted
  | QuestionariesError;
