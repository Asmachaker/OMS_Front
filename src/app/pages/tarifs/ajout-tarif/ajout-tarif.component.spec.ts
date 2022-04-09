import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTarifComponent } from './ajout-tarif.component';

describe('AjoutTarifComponent', () => {
  let component: AjoutTarifComponent;
  let fixture: ComponentFixture<AjoutTarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutTarifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
