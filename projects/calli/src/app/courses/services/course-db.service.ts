import { Course } from '../models/course.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CourseDbService {
  courses$: Observable<Course[]> = null;
  private userId: string;
  private userTkn: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.userTkn = user.refreshToken;
      }
    });
  }

  addCourse(course: Course, uid: string) {
    const courses = this.db.list(`courses/${uid}`);
    return courses.push(course);
  }
  addCourses(courses: Course[]): void {
    if (courses) {
      courses.forEach((course: Course) => {
        this.db.list(`courses/${this.userId}`).push(course);
      });
    }
  }
  getAll(uid: string) {
    return this.db.list<Course>(`courses/${uid}`).snapshotChanges();
  }

  update(course: Course, uid: string) {
    return of(
      this.db.object(`courses/${uid}/` + course.id).update({
        id: course.id,
        name: course.name,
        section: course.section,
        descriptionHeading: course.descriptionHeading,
        description: course.description,
        room: course.room,
        ownerId: course.ownerId,
        creationTime: course.creationTime,
        updateTime: course.updateTime,
        enrollmentCode: course.enrollmentCode,
        courseState: course.courseState,
        alternateLink: course.alternateLink,
        teacherGroupEmail: course.teacherGroupEmail,
        courseGroupEmail: course.courseGroupEmail,
        guardiansEnabled: course.guardiansEnabled,
        calendarId: course.calendarId,
        teacherFolder: course.teacherFolder,
        courseMaterialSets: course.courseMaterialSets,
      })
    );
  }

  delete(course: Course, uid: string) {
    return this.db.object(`courses/${uid}/` + course.id).remove();
  }
}
