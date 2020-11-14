import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import * as fromQuiz from './../../store/quiz.actions';
import { getQuiz } from './../../store/quiz.selectors';
import { getIsLoading } from '../../store/quiz.selectors';
import { AppState } from '../../../state/app.state';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'calli-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  quizList: Quiz[];
  sub: Subscription;
  lastQuizIndex: number;
  quizContainer: Quiz[] = [];

  constructor(
    private store: Store<AppState>,
    public quizService: QuizService,
    private authService: AuthService,
    public dialog: MatDialog) {

  }

  get user() {
    return this.authService.getCurrentUser();
  }
  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
    this.sub = this.store.select(getQuiz).pipe(
      map((quizes: Quiz[]) => {
        if (this.user && !quizes) {
          this.store.dispatch(new fromQuiz.QuizQuery());
        }
        return quizes;
      })
    ).subscribe((quizes: Quiz[]) => {
      if (quizes && quizes.length !== 0) {
        const index: number = Number(quizes[quizes.length - 1].id);
        this.lastQuizIndex = index;
      } else {
        this.lastQuizIndex = 0;
      }
      this.quizList = quizes;
      this.quizContainer = quizes;
    });

  }

  drop(event: CdkDragDrop<Quiz[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    //this.quizService.sortQuizes(this.quizes);
  }

  openQuizDialog(quiz?: Quiz): void {
    const newQuiz = {
      id: this.lastQuizIndex + 1,
      title: '',
      isActive: true,
      description: '',
      priority: this.quizList.length
    };
    const dialogRef = this.dialog.open(QuizDialogComponent, {
      width: '400px',
      data: quiz
        ? { quiz: { ...quiz }, isNew: false, }
        : {
          quiz: newQuiz, isNew: true,
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {

          result.quiz.questions = [{ questionText: '', label: 'purple', isActive: true, priority: 0 }];
          this.store.dispatch(new fromQuiz.QuizAdded({ quiz: result.quiz }));
        } else {
          this.store.dispatch(new fromQuiz.QuizEdited({ quiz: result.quiz }));
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  trackByFunction(index: any) {
    return index;
  }
}
