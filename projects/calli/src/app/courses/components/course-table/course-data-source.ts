import { DataSource } from '@angular/cdk/table';
import { Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CollectionViewer } from '@angular/cdk/collections';

import { Observable, merge, of, BehaviorSubject } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { GoogleApiService } from '../../../auth/services/former-google-api.service';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CourseDataSource extends DataSource<Course> {
  private courseSubject = new BehaviorSubject<Course[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  sort: MatSort;
  paginator: MatPaginator;


  constructor(private googleApiService: GoogleApiService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  /* connect() {
    const dataMutations = [of('Initial load'), this.paginator.page, this.sort.sortChange];
    return merge(...dataMutations).pipe(mergeMap(() => {
      return this.googleApiService.listCourses(this.paginator.pageSize);
    }));
  } */

  connect(collectionViewer: CollectionViewer): Observable<Course[] | readonly Course[]> {
    throw new Error('Method not implemented.');
  }
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.courseSubject.complete();
    this.loadingSubject.complete();
  }

}

/*  loadCourses(pageSize?: number) {
   this.loadingSubject.next(true);
   this.googleApiService.listCourses().then(courses => {
     this.courseSubject.next(courses);
   }).catch(
     () => finalize(
       () => this.loadingSubject.next(false)
     )
   );
 }
} */
/**
 * Paginate the data (client-side). If you're using server-side pagination,
 * this would be replaced by requesting the appropriate data from the server.
 */
/* private getPagedData(data: Course[]) {
  const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  return data.splice(startIndex, this.paginator.pageSize);
} */

/**
 * Sort the data (client-side). If you're using server-side sorting,
 * this would be replaced by requesting the appropriate data from the server.
 */
/*  private getSortedData(data: Course[]) {
   if (!this.sort.active || this.sort.direction === '') {
     return data;
   }

   return data.sort((a, b) => {
     const isAsc = this.sort.direction === 'asc';
     switch (this.sort.active) {
       case 'id':
         return compare(a.id, b.id, isAsc);
       case 'name':
         return compare(a.name, b.name, isAsc);
       default:
         return 0;
     }
   });
 }
} */

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
/* function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
 */
