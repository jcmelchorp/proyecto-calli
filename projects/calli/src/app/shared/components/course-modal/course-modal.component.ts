import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

import { Subject } from 'rxjs';

import { Course } from '../../../courses/models/course.model';

@Component({
  selector: 'calli-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {
  courseForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit() {
    this.courseForm = this.fb.group({
      name: new FormControl(this.data.name, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
      descriptionHeading: new FormControl(this.data.descriptionHeading, [Validators.required]),
      section: new FormControl(this.data.section, [Validators.required]),
      courseState: new FormControl(this.data.courseState, [Validators.required]),
      guardiansEnabled: new FormControl(this.data.guardiansEnabled, [Validators.required]),
      ownerId: new FormControl(this.data.ownerId, [Validators.required])
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      //this.courseData.next(this.course);

    } else {
      const controls = this.courseForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
