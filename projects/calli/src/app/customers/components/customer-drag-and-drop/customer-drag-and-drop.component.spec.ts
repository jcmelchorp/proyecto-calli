import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDragAndDropComponent } from './customer-drag-and-drop.component';

describe('CustomerDragAndDropComponent', () => {
  let component: CustomerDragAndDropComponent;
  let fixture: ComponentFixture<CustomerDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDragAndDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
