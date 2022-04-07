import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMdpComponent } from './email-mdp.component';

describe('EmailMdpComponent', () => {
  let component: EmailMdpComponent;
  let fixture: ComponentFixture<EmailMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailMdpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
