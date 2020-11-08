import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { FirebaseService } from '../../services/firebase.service';
import { UsersState } from '../../store/users.state';
import {
  DeleteUser, UpdateUser
} from '../../store/actions/users.actions';

@Component({
  selector: 'calli-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  validationMessages = {
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    surname: [
      { type: 'required', message: 'Surname is required.' }
    ],
    age: [
      { type: 'required', message: 'Age is required.' },
    ]
  };

  item: any;

  exampleForm: FormGroup;
  name: FormControl;
  surname: FormControl;
  age: FormControl;

  constructor(
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    public router: Router,
    public route: ActivatedRoute,
    private store: Store<UsersState>
  ) { }

  ngOnInit() {

    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.item = data.data;
        this.item.id = data.userId;
        this.createFormControls();
        this.createForm();
      }
    });
  }

  createFormControls = () => {
    this.name = new FormControl(this.item.name, Validators.required);
    this.surname = new FormControl(this.item.surname, Validators.required);
    this.age = new FormControl(this.item.age, Validators.required);
  }

  createForm = () => {
    this.exampleForm = new FormGroup({
      name: this.name,
      surname: this.surname,
      age: this.age
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item.avatar = result.link;
      }
    });
  }


  onSubmit(value) {
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    const id = this.item.id;
    this.store.dispatch(new UpdateUser({ id, ...value }));
  }

  delete() {
    this.store.dispatch(new DeleteUser(this.item.id));
  }

  cancel() {
    this.router.navigate(['/home']);
  }


}
