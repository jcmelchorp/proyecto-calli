import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { CourseModalComponent } from './components/course-modal/course-modal.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersModalComponent } from './components/customers-modal/customers-modal.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { LoaderUiComponent } from './components/loader-ui/loader-ui.component';
import { SnackService } from './services/snack.service';



@NgModule({
  declarations: [
    ConfirmModalComponent,
    CourseComponent,
    CoursesListComponent,
    CourseModalComponent,
    CustomersModalComponent,
    CustomersListComponent,
    DeleteButtonComponent,
    LoaderUiComponent
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
    LoaderUiComponent
  ],
  providers: [SnackService]
})
export class SharedModule { }
