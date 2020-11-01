import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'calli-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainProfileComponent implements OnInit {
  @Input() user: User;
  @Output() profileUpdate = new EventEmitter<any>();

  updateProfileForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      displayName: new FormControl(this.user.displayName),
      photoURL: new FormControl(this.user.photoURL)
    });
  }

  onProfileUpdate() {
    this.profileUpdate.emit(this.updateProfileForm.value);
  }

}
