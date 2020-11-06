import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from '../material/material.module';

import { GravatarService } from './services/gravatar.service';
import { SeoService } from './services/seo.service';
import { SnackService } from './services/snack.service';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { CourseModalComponent } from './components/course-modal/course-modal.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersModalComponent } from './components/customers-modal/customers-modal.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';



@NgModule({
  declarations: [
    ConfirmModalComponent,
    CourseComponent,
    CoursesListComponent,
    CourseModalComponent,
    CustomersModalComponent,
    CustomersListComponent,
    DeleteButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],
  exports: [
    ConfirmModalComponent,
    CourseComponent,
    CoursesListComponent,
    CourseModalComponent,
    CustomersModalComponent,
    CustomersListComponent,
    DeleteButtonComponent,
  ],
  providers: [SnackService],
  entryComponents: [
    ConfirmModalComponent,
    CustomersModalComponent,
    CourseModalComponent,
    DeleteButtonComponent
  ],
})
export class SharedModule { }
