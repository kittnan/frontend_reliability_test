import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSendmailComponent } from './dialog-sendmail.component';

describe('DialogSendmailComponent', () => {
  let component: DialogSendmailComponent;
  let fixture: ComponentFixture<DialogSendmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSendmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSendmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
