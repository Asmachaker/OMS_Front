import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifTarifComponent } from './modif-tarif.component';

describe('ModifTarifComponent', () => {
  let component: ModifTarifComponent;
  let fixture: ComponentFixture<ModifTarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifTarifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
