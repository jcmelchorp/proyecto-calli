import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { QuizRoutingModule } from './quiz-routing.module';

import { QuizEffects } from './store/quiz.effects';
import * as fromQuiz from './store/quiz.reducer';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';
import { QuizDialogComponent } from './components/quiz-dialog/quiz-dialog.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizComponent } from './components/quiz/quiz.component';



@NgModule({
  declarations: [QuizListComponent, QuizComponent, QuizDialogComponent, QuestionDialogComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('quiz', fromQuiz.quizReducer),
    EffectsModule.forFeature([QuizEffects]),
  ],
  entryComponents: [QuizDialogComponent, QuestionDialogComponent]
})
export class QuizModule { }
