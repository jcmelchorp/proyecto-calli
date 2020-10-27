import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesShellComponent } from './courses-shell.component';

describe('CoursesShellComponent', () => {
  let component: CoursesShellComponent;
  let fixture: ComponentFixture<CoursesShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
