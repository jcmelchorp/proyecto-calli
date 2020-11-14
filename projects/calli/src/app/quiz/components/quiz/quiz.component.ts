import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { Question, Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import * as fromQuiz from './../../store/quiz.actions';
import { AppState } from '../../../state/app.state';

@Component({
  selector: 'calli-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  @Input() quiz;
  newQuestion = {
    questionText: '', label: 'purple', answers: [{
      id: 0,
      answerText: ''
    }, {
      id: 1,
      answerText: ''
    }, {
      id: 2,
      answerText: ''
    }, {
      id: 3,
      answerText: ''
    }]
  };

  questionDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.quiz.questions, event.previousIndex, event.currentIndex);
    this.quizService.updateQuestions(this.quiz.id, this.quiz.questions);
  }

  openDialog(question?: Question, idx?: number): void {

    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '500px',
      data: question
        ? { question: { ...question }, isNew: false, quizId: this.quiz.id, idx }
        : { question: this.newQuestion, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.quizService.updateQuestions(this.quiz.fsId, [
            ...this.quiz.questions,
            result.question
          ]);
        } else {
          const update = this.quiz.questions;
          update.splice(result.idx, 1, result.question);
          this.quizService.updateQuestions(this.quiz.fsId, this.quiz.questions);
        }
      }
    });
  }

  handleDelete() {
    this.store.dispatch(new fromQuiz.QuizDeleted({ quiz: this.quiz }));
    // this.quizService.deleteQuiz(this.quiz.id);
  }

  constructor(
    private quizService: QuizService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }
}
