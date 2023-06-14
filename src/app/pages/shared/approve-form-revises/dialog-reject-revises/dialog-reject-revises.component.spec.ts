import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRejectRevisesComponent } from './dialog-reject-revises.component';

describe('DialogRejectRevisesComponent', () => {
  let component: DialogRejectRevisesComponent;
  let fixture: ComponentFixture<DialogRejectRevisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRejectRevisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRejectRevisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
