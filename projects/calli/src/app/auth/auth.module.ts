import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAuth from './store/auth.reducer';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './store/auth.effects';


@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthService]
})
export class AuthModule { }
