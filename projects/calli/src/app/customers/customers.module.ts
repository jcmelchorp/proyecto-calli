import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './components/customers/customers.component';
import { FormsModule } from '@angular/forms';
import * as fromCustomers from './store/customers.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomersEffects } from './store/customers.effects';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerDragAndDropComponent } from './components/customer-drag-and-drop/customer-drag-and-drop.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    StoreModule.forFeature('customers', fromCustomers.customersReducer),
    EffectsModule.forFeature([CustomersEffects])
  ],
  declarations: [CustomersComponent, CustomerDragAndDropComponent],
  exports: [CustomersComponent, CustomerDragAndDropComponent],
})
export class CustomersModule { }

