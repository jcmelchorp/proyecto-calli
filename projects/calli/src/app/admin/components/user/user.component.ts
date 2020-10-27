import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'calli-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  @Input() user: any;
  @Output() userSelected = new EventEmitter<any>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();
  circ = faCircle;
  constructor() { }

  ngOnInit(): void { }
  selectUser(): void {
    this.userSelected.emit(this.user);
  }

  addAdminPrivileges(): void {
    this.addAdmin.emit(this.user);
  }

  removeAdminPrivileges(): void {
    this.removeAdmin.emit(this.user);
  }
}
