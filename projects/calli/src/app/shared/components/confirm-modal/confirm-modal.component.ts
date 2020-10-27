import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'calli-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  confirmation: Subject<boolean> = new Subject();

  constructor(
    public dialog: MatDialog,

  ) { }
  ngOnInit(): void {
  }
  onDelete(): void {
    this.confirmation.next(true);
    this.dialog.closeAll();
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }

}
