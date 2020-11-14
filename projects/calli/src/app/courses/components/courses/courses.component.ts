import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';

import { faPlus, faQuestionCircle, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import { Subject, Subscription, Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

import { Course, Teachers } from '../../models/course.model';
import { AppState } from '../../../state/app.state';
import { GoogleApiService } from '../../../auth/services/google-api.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { CourseModalComponent } from '../../../shared/components/course-modal/course-modal.component';

@Component({
  selector: 'calli-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  courseSub: Subscription;
  plus = faPlus;
  question = faQuestionCircle;
  world = faGlobeAmericas;
  courses$: Observable<Course[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  courses: Course[];
  teachers: Teachers[];
  constructor(
    public googleApiService: GoogleApiService,
    private afAuth: AngularFireAuth,
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    /* this.googleApiService.listCourses2().then(courses => {
      this.courses = courses;
      this.courses.map(c => {
        this.googleApiService.listTeachers(c.id).then(teachers => {
          this.teachers = teachers;
          console.log(this.teachers)
        });
      })
    }); */

  }
  ngAfterViewInit() {
    this.googleApiService.listCourses();

  }

  getTeachers() {
  }

  onCourseDelete(course: Course) {
    //this.openConfirmModal(course);
  }

  onCourseEdit(course: Course) {
    this.openEditCourseModal(course);
  }
  trackByFunction(index: any) {
    return index;
  }
  openEditCourseModal(course: Course): void {
    const courseCopy = course;
    const dialogRef = this.dialog.open(CourseModalComponent, {
      width: '500px',
      data: courseCopy
    });
    dialogRef.afterClosed().subscribe((result: any) => {

    });

  }
  /*
   openConfirmModal(course: Course): void {
     const dialogRef = this.dialog.open(ConfirmModalComponent, { width: '400px' });

     dialogRef.afterClosed().pipe(take(1)).subscribe((confirmation: boolean) => {
       if (confirmation) {

       }
     });
   }
  */
}
