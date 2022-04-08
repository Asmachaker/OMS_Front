import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxZoneComponent } from './dialog-box-zone.component';

describe('DialogBoxZoneComponent', () => {
  let component: DialogBoxZoneComponent;
  let fixture: ComponentFixture<DialogBoxZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
