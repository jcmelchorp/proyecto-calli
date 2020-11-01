import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from '../material/material.module';

import { ProfileRoutingModule } from './profile-routing.module';

import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ProfileComponent } from './containers/profile/profile.component';


@NgModule({
  declarations: [ProfileComponent, MainProfileComponent, ProfileUserComponent],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],

})
export class ProfileModule { }
