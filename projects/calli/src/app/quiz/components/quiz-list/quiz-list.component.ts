import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'calli-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit, OnDestroy {

  quizList: Quiz[];
  sub: Subscription;

  constructor(
    public quizService: QuizService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sub = this.quizService
      .getUserQuizes()
      .subscribe(quizList => (this.quizList = quizList));
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.quizList, event.previousIndex, event.currentIndex);
    this.quizService.sortQuizes(this.quizList);
  }

  openQuizDialog(): void {
    const dialogRef = this.dialog.open(QuizDialogComponent, {
      width: '400px',
      data: { quiz: {}, dialogAction: 'Crear' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.quizService.createQuiz({
          title: result.quiz.title,
          priority: this.quizList.length
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
