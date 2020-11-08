import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditUserResolver } from './components/edit-user/edit-user.resolve';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UsersComponent } from './components/users/users.component';
import { ManageUsersComponent } from './containers/manage-users/manage-users.component';

const routes: Routes = [
  { path: '', component: ManageUsersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'details/:id', component: EditUserComponent, resolve: { data: EditUserResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
