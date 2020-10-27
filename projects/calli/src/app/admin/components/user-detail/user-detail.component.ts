import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../auth/models/user.model';
import { Course } from '../../../courses/models/course.model';
import { Customer } from '../../../customers/models/customer.model';


@Component({
  selector: 'calli-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() courses: Course[];
  @Input() customers: Customer[];
  @Input() userCoursesLoading: boolean;
  @Input() userCustomersLoading: boolean;
  @Output() detailsClosed = new EventEmitter<any>();
  @Output() coursesLoad = new EventEmitter<any>();
  @Output() customersLoad = new EventEmitter<any>();
  @Output() courseDeleted = new EventEmitter<Course>();
  @Output() customerDeleted = new EventEmitter<Customer>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();
  left = faArrowLeft;
  circ = faCircle;

  constructor() { }

  ngOnInit(): void { }

  closeDetails(): void {
    this.detailsClosed.emit();
  }

  loadCustomers() {
    this.customersLoad.emit();
  }

  loadCourses(): void {
    this.coursesLoad.emit();
  }
  onCustomerDelete(customer: Customer): void {
    this.customerDeleted.emit(customer);
  }
  onCourseDelete(course: Course): void {
    this.courseDeleted.emit(course);
  }

  onAddAdmin(): void {
    this.addAdmin.emit(this.user);
  }

  onRemoveAdmin(): void {
    this.removeAdmin.emit(this.user);
  }
}
