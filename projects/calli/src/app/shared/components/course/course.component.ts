import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { GoogleApiService } from './../../../auth/services/google-api.service';
import { Course } from '../../../courses/models/course.model';

@Component({
  selector: 'calli-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  panelOpenState = false;
  @Input() course: Course;
  @Input() editable = true;
  @Output() deleted = new EventEmitter<Course>();
  @Output() edited = new EventEmitter<Course>();

  constructor(public googleService: GoogleApiService) { }
  ngOnInit() { }

  onDelete() {
    this.deleted.emit(this.course);
  }

  onEdit() {
    this.edited.emit(this.course);
  }
  onTeachers(courseId: string) {
    this.googleService.listTeachers(courseId);
  }
}
