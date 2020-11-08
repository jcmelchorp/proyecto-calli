import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';

import { ManageUsersRoutingModule } from './manage-users-routing.module';

import { AvatarDialogComponent } from './components/avatar-dialog/avatar-dialog.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditUserResolver } from './components/edit-user/edit-user.resolve';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UsersComponent } from './components/users/users.component';
import { ManageUsersComponent } from './containers/manage-users/manage-users.component';
import { UsersEffects } from './store/effects/users.effects';
import * as fromUsers from './store/reducers/users.reducer';


@NgModule({
  providers: [EditUserResolver],
  declarations: [
    ManageUsersComponent,
    UsersComponent,
    NewUserComponent,
    EditUserComponent,
    AvatarDialogComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    StoreModule.forFeature('users', fromUsers.usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ]
})
export class ManageUsersModule { }
