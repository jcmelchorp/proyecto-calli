import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { from, merge, Observable, of, Subject, Subscription } from 'rxjs';

import { Course } from './../../models/course.model';
import { GoogleApiService } from '../../../auth/services/google-api.service';

import { CourseDataSource } from './course-data-source';

@Component({
  selector: 'calli-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CourseTableComponent implements OnInit, OnDestroy {
  @Input() courses: Course[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Course>;
  dataLength: number;
  dataSource: CourseDataSource;
  displayedColumns = ['name', 'section', 'courseState'];

  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private googleApiService: GoogleApiService) { }

  ngOnInit(): void {
    this.dataSource = new CourseDataSource(this.googleApiService);

  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
