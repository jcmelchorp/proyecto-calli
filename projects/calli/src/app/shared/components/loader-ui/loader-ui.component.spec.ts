import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderUiComponent } from './loader-ui.component';

describe('LoaderUiComponent', () => {
  let component: LoaderUiComponent;
  let fixture: ComponentFixture<LoaderUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderUiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});