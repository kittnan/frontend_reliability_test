import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReviseRejectComponent } from './dialog-revise-reject.component';

describe('DialogReviseRejectComponent', () => {
  let component: DialogReviseRejectComponent;
  let fixture: ComponentFixture<DialogReviseRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReviseRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogReviseRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
