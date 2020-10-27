import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';

import { Observable } from 'rxjs';

import { Customer } from '../../../customers/models/customer.model';


@Component({
  selector: 'calli-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersListComponent {
  @Input() customers: Customer[];
  @Input() isLoading$: Observable<boolean>;
  @Output() customerDeleted = new EventEmitter<Customer>();
  @Output() customerEdited = new EventEmitter<Customer>();
  trash = faTrashAlt;
  edit = faEdit;
  displayedColumns: string[] = ['id', 'name', 'priority', 'actions'];
  constructor() { }

  onEdit(customer: Customer) {
    this.customerEdited.emit(customer);
  }

  onDelete(customer: Customer) {
    this.customerDeleted.emit(customer);
  }

  trackByFn(index: any) {
    return index;
  }
}
