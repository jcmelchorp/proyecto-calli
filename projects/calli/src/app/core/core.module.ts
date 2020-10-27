import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './containers/shell/shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { WellcomeComponent } from './components/wellcome/wellcome.component';


@NgModule({
  declarations: [
    AboutComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    WellcomeComponent,
    MainComponent,
    NotFoundComponent,
    PrivacyPolicyComponent,
    UnderConstructionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    LayoutModule,

  ],
  exports: [
    AboutComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    WellcomeComponent,
    MainComponent,
    NotFoundComponent,
    PrivacyPolicyComponent,
    UnderConstructionComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module')
    }
  }
}
