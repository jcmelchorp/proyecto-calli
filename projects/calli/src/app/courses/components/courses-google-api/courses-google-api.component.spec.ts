import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesGoogleApiComponent } from './courses-google-api.component';

describe('CoursesGoogleApiComponent', () => {
  let component: CoursesGoogleApiComponent;
  let fixture: ComponentFixture<CoursesGoogleApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesGoogleApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesGoogleApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
