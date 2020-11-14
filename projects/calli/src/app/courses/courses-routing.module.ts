import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesFirebaseComponent } from './components/courses-firebase/courses-firebase.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesShellComponent } from './containers/courses-shell/courses-shell.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesShellComponent,
    children: [
      { path: '', component: CoursesComponent },
      { path: 'firebase', component: CoursesFirebaseComponent },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
