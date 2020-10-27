import { CourseTableComponent } from './components/course-table/course-table.component';
import { CoursesGoogleApiComponent } from './components/courses-google-api/courses-google-api.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesFirebaseComponent } from './components/courses-firebase/courses-firebase.component';
import { CoursesShellComponent } from './containers/courses-shell/courses-shell.component';
import { CoursesComponent } from './components/courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesShellComponent,
    children: [
      { path: '', component: CoursesComponent },
      { path: 'firebase', component: CoursesFirebaseComponent },
      { path: 'google', component: CoursesGoogleApiComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
