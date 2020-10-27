import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './containers/shell/shell.component';


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
    CarouselModule
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
