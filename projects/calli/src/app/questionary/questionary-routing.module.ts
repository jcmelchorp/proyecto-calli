import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionariesComponent } from './containers/questionaries/questionaries.component';

const routes: Routes = [{ path: '', component: QuestionariesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionaryRoutingModule { }
