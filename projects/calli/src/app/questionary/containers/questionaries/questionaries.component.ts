import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

import { delay, map, switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

import { Questionary } from '../../models/questionary.model';
import { QuestionaryService } from '../../services/questionary.service';
import { QuestionaryDialogComponent } from '../../components/questionary-dialog/questionary-dialog.component';

@Component({
  selector: 'app-questionaries',
  templateUrl: './questionaries.component.html',
  styleUrls: ['./questionaries.component.scss']
})
export class QuestionariesComponent implements OnInit {
  questionaries$: Observable<Questionary[]>;
  sub: Subscription;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private questionaryService: QuestionaryService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.questionaryService
      .getUserQuestionaries().pipe(delay(4000))
      .subscribe(result => this.questionaries$ = result.questionary);
  }

  // Based on the screen size, switch from standard to one column per row */

  openQuestionaryDialog(): void {
    const dialogRef = this.dialog.open(QuestionaryDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.questionaryService.createQuestionary({
          title: result.title
        });
      }
    });
  }




}
