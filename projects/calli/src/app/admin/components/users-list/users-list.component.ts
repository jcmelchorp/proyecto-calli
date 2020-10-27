import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'calli-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  @Input() users: any[] | undefined;
  @Output() userSelected = new EventEmitter<any>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void { }
  onUserSelected(user: any): void {
    this.userSelected.emit(user);
  }

  onAddAdmin(user: any): void {
    this.addAdmin.emit(user);
  }

  onRemoveAdmin(user: any): void {
    this.removeAdmin.emit(user);
  }

  trackByFn(index: any): void {
    return index;
  }
}
