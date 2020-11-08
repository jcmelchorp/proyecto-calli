import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'calli-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();

  constructor(
    public firebaseService: FirebaseService,
    public dialogRef: MatDialogRef<AvatarDialogComponent>
  ) { }

  ngOnInit() {
    this.getAvatars();
  }

  getAvatars = () => {
    this.firebaseService.getAvatars().subscribe(
      data => {
        this.avatars = data;
      }
    );
  }

  close(avatar) {
    this.dialogRef.close(avatar);
  }

}
