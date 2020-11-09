import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AdminGuard } from './admin/guard/admin.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AboutComponent } from './core/components/about/about.component';
import { HomeComponent } from './core/components/home/home.component';
import { MainComponent } from './core/components/main/main.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PrivacyPolicyComponent } from './core/components/privacy-policy/privacy-policy.component';
import { UnderConstructionComponent } from './core/components/under-construction/under-construction.component';

const routes: Routes = [{
  path: '', component: HomeComponent, children: [
    { path: '', component: MainComponent },
    {
      path: 'admin',
      loadChildren: () =>
        import('./admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AdminGuard],
    },
    {
      path: 'manage',
      loadChildren: () =>
        import('./manage-users/manage-users.module').then(m => m.ManageUsersModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'profile',
      loadChildren: () =>
        import('./profile/profile.module').then((m) => m.ProfileModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'customers',
      loadChildren: () =>
        import('./customers/customers.module').then((m) => m.CustomersModule),
      canActivate: [AuthGuard]
    },
    { path: 'quizes', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule) },
/*     { path: 'questionaries', loadChildren: () => import('./questionary/questionary.module').then(m => m.QuestionaryModule) }
 */  ],
},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'about', component: AboutComponent },
{ path: 'privacy-policy', component: PrivacyPolicyComponent },
{ path: 'under-construction', component: UnderConstructionComponent },
{ path: '**', component: NotFoundComponent },];
@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
