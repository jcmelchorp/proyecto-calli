import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { Questionary } from '../models/questionary.model';
import { QuestionaryService } from '../services/questionary.service';
import * as fromQuestionaries from './../store/questionary.actions';
import { getUser } from '../../auth/store/auth.selectors';

import * as fromQuestionary from './questionary.actions';

@Injectable()
export class QuestionariesEffects {

  constructor(private actions$: Actions, private questionariesService: QuestionaryService, private store: Store<AppState>) { }

  @Effect()
  query$ = this.actions$.pipe(
    ofType(fromQuestionaries.QuestionariesActionTypes.QUESTIONARIES_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.questionariesService.getUserQuestionaries(user.uid)
      .pipe(
        map((data: any) => {
          const questionariesData: Questionary[] = data.map((res: any) => {
            const key = res.payload.key;
            const questionary: Questionary = res.payload.val();
            return {
              key: key || null,
              id: questionary.id,
              name: questionary.title,
              priority: questionary.priority,
              description: questionary.description
            };
          });
          return (new fromQuestionaries.QuestionariesLoaded({ questionaries: questionariesData }));
        }),
        catchError(error => {
          return of(new fromQuestionaries.QuestionariesError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(fromQuestionaries.QuestionariesActionTypes.QUESTIONARIES_ADDED),
    map((action: fromQuestionaries.QuestionariesAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.questionariesService.add(payload.questionarie, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(fromQuestionaries.QuestionariesActionTypes.QUESTIONARIES_EDITED),
    map((action: fromQuestionaries.QuestionariesEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.questionariesService.update(payload.questionarie, user.uid)
      .pipe(
        catchError(error => {
          return of(new fromQuestionaries.QuestionariesError({ error }));
        }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(fromQuestionaries.QuestionariesActionTypes.QUESTIONARIES_DELETED),
    map((action: fromQuestionaries.QuestionariesDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.questionariesService.delete(payload.questionarie, user.uid))
  );
}
