import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminEffects } from './store/admin.effects';
import * as fromAdmin from './store/admin.reducer';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AdminComponent } from './containers/admin/admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
    UserComponent,
    UserDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forFeature('admin', fromAdmin.adminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ]
})
export class AdminModule { }
