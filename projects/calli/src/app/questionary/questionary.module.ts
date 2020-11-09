import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { QuestionaryRoutingModule } from './questionary-routing.module';

import { QuestionariesEffects } from './store/questionary.effects';
import * as fromQuestionary from './store/questionary.reducer';
import { QuestionaryDialogComponent } from './components/questionary-dialog/questionary-dialog.component';
import { QuestionaryListComponent } from './components/questionary-list/questionary-list.component';
import { QuestionariesComponent } from './containers/questionaries/questionaries.component';


@NgModule({
  declarations: [
    QuestionariesComponent,
    QuestionaryDialogComponent,
    QuestionaryListComponent
  ],
  imports: [
    CommonModule,
    QuestionaryRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('questionaries', fromQuestionary.questionariesReducer),
    EffectsModule.forFeature([QuestionariesEffects])
  ],
  exports: [QuestionaryListComponent, QuestionariesComponent,
    QuestionaryDialogComponent],
  entryComponents: [QuestionaryDialogComponent]

})
export class QuestionaryModule { }
