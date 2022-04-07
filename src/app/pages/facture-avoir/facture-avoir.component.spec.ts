import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureAvoirComponent } from './facture-avoir.component';

describe('FactureAvoirComponent', () => {
  let component: FactureAvoirComponent;
  let fixture: ComponentFixture<FactureAvoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureAvoirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
