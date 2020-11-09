import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionaryDialogComponent } from './questionary-dialog.component';

describe('QuestionaryDialogComponent', () => {
  let component: QuestionaryDialogComponent;
  let fixture: ComponentFixture<QuestionaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionaryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
