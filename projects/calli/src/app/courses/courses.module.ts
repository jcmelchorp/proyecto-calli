import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { ConfirmModalComponent } from './../shared/components/confirm-modal/confirm-modal.component';

import { CoursesRoutingModule } from './courses-routing.module';

import { CourseDbService } from './services/course-db.service';
import { CourseEffect } from './store/course.effects';
import * as fromCourse from './store/course.reducer';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { CoursesFirebaseComponent } from './components/courses-firebase/courses-firebase.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TableComponent } from './components/table/table.component';
import { CoursesShellComponent } from './containers/courses-shell/courses-shell.component';

@NgModule({
  declarations: [
    CoursesFirebaseComponent,
    CourseTableComponent,
    CoursesShellComponent,
    CoursesComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    SharedModule,
    StoreModule.forFeature('courses', fromCourse.courseReducer),
    EffectsModule.forFeature([CourseEffect]),
  ],
  exports: [],
  providers: [CourseDbService],
  entryComponents: [ConfirmModalComponent],
})
export class CoursesModule { }
