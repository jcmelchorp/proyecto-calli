import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { QuizService } from '../../services/quiz.service';
import { Answer } from './../../../questionary/models/questionary.model';
@Component({
  selector: 'calli-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];
  option: string = '';
  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    private quizService: QuizService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  handleQuestionDelete(): void {
    this.quizService.removeQuestion(this.data.quizId, this.data.question);
    this.dialogRef.close();
  }
}
