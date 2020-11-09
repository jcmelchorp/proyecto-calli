import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { select, Store } from '@ngrx/store';

import { from, merge, Observable, Subscription } from 'rxjs';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';

import { Questionary } from '../../models/questionary.model';
import { QuestionaryService } from './../../services/questionary.service';
import * as QuestionaryActions from '../../store/questionary.actions';
import QuestionaryState from '../../store/questionary.state';

@Component({
  selector: 'app-questionary-list',
  templateUrl: './questionary-list.component.html',
  styleUrls: ['./questionary-list.component.scss'],
})
export class QuestionaryListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Questionary>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Questionary>;
  questionary$: Observable<QuestionaryState>;
  questionaries$: Observable<Questionary[]>;

  questionarySubscription: Subscription;
  questionaryList: Questionary[];
  questionaryError: Error;
  displayedColumns: string[] = [
    'id',
    'title'
  ];
  isQuestionaryListLoaded = false;
  constructor(private store: Store<QuestionaryState>) {
    this.questionaries$ = store.pipe(select('questionaries'));
  }

  /* ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  } */
  ngAfterViewInit(): void {
    this.questionarySubscription = this.questionary$
      .pipe(delay(6000),
        map((questionaryState: QuestionaryState) => {
          this.questionaryList = questionaryState.questionaries;
          this.questionaryError = questionaryState.questionaryError;
          this.isQuestionaryListLoaded = questionaryState.isLoaded;
          this.dataSource = new MatTableDataSource(this.questionaryList);
          this.dataSource.paginator = this.paginator;
        })
      )
      .subscribe();
    this.store.dispatch(QuestionaryActions.BeginGetQuestionariesAction());
  }

  isDataSourceEmpty(): boolean {
    return this.dataSource && this.dataSource.data.length === 0;
  }

  ngOnDestroy() {
    this.questionarySubscription.unsubscribe();
  }
}
