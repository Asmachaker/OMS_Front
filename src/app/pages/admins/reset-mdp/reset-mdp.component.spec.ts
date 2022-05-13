import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetMdpComponent } from './reset-mdp.component';

describe('ResetMdpComponent', () => {
  let component: ResetMdpComponent;
  let fixture: ComponentFixture<ResetMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetMdpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
