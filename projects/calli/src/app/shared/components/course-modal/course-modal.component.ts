import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from '../../../courses/models/course.model';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'calli-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {
  @ViewChild('courseForm', { static: true }) courseForm: NgForm;
  close = faWindowClose;
  heading: string;

  title: string;
  description: string;
  photoUrl: string;

  courseData: Subject<Course> = new Subject();
  course: Course;

  constructor(
    public dialogService: MatDialog,
  ) {

  }
  ngOnInit() {
  }

  onSave() {
    if (this.courseForm.valid) {
      this.courseData.next(this.course);
      this.dialogService.closeAll();
    } else {
      const controls = this.courseForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

}
