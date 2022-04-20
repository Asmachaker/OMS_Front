import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBordereauComponent } from './get-bordereau.component';

describe('GetBordereauComponent', () => {
  let component: GetBordereauComponent;
  let fixture: ComponentFixture<GetBordereauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBordereauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
