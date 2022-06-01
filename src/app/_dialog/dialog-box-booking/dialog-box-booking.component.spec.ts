import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxBookingComponent } from './dialog-box-booking.component';

describe('DialogBoxBookingComponent', () => {
  let component: DialogBoxBookingComponent;
  let fixture: ComponentFixture<DialogBoxBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
