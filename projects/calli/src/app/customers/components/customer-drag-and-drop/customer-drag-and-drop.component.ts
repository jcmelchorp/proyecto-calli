import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Customer } from '../../models/customer.model';

@Component({
  selector: 'calli-customer-drag-and-drop',
  templateUrl: './customer-drag-and-drop.component.html',
  styleUrls: ['./customer-drag-and-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerDragAndDropComponent implements OnInit {
  @Input() customers: Customer[];
  @Input() isLoading$: Observable<boolean>;
  assignedTasks = [];
  unassignedTasks: Customer[] = [];
  constructor() { }

  ngOnInit(): void {
    this.customers.map(customer => {
      // tslint:disable-next-line: no-bitwise
      if (customer.id === 4) {
        this.assignedTasks.push(customer);
      }
      // } else {
      this.unassignedTasks.push(customer);
      // }
    })
  }

  drop(event: CdkDragDrop<Customer[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
