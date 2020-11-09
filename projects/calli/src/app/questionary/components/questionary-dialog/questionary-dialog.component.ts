import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-questionary-dialog',
  templateUrl: './questionary-dialog.component.html',
  styleUrls: ['./questionary-dialog.component.scss']
})
export class QuestionaryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QuestionaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
