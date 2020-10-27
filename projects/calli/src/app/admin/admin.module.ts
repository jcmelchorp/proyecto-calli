import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAdmin from './store/admin.reducer';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './containers/admin/admin.component';
import { FlexLayoutModule } from '@angular/flex-layout/typings/module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AdminEffects } from './store/admin.effects';


@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
    UserComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('admin', fromAdmin.adminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ]
})
export class AdminModule { }
