import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { Quiz } from '../models/quiz.model';
import { QuizService } from '../services/quiz.service';
import { AppState } from './../../state/app.state';
import { getUser } from '../../auth/store/auth.selectors';

import * as fromQuiz from './quiz.actions';
import { QuizActionTypes } from './quiz.actions';

@Injectable()
export class QuizEffects {
  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private store: Store<AppState>
  ) { }

  @Effect()
  query$ = this.actions$.pipe(
    ofType(QuizActionTypes.QUIZ_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) =>
      this.quizService.get(user.uid).pipe(
        map((data: any) => {
          const quizData: Quiz[] = data.map((res: any) => {
            const key = res.payload.key;
            const fsId = res.payload.fsId;
            const quiz: Quiz = res.payload.val();
            return {
              dbId: key || null,
              fsId: quiz.fsId,
              id: quiz.id,
              title: quiz.title,
              isActive: quiz.isActive,
              description: quiz.description,
              areaTags: quiz.areaTag,
              priority: quiz.priority,
              questions: quiz.questions,
            };
          });
          return new fromQuiz.QuizLoaded({ quiz: quizData });
        }),
        catchError((error) => {
          return of(new fromQuiz.QuizError({ error }));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(QuizActionTypes.QUIZ_ADDED),
    map((action: fromQuiz.QuizAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.quizService.createQuiz(payload.quiz, user.uid)
    )
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(QuizActionTypes.QUIZ_EDITED),
    map((action: fromQuiz.QuizEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.quizService.update(payload.quiz, user.uid).pipe(
        catchError((error) => {
          return of(new fromQuiz.QuizError({ error }));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(QuizActionTypes.QUIZ_DELETED),
    map((action: fromQuiz.QuizDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.quizService.deleteQuiz(payload.quiz, user.uid)
    )
  );
}
