import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReviseApproveComponent } from './dialog-revise-approve.component';

describe('DialogReviseApproveComponent', () => {
  let component: DialogReviseApproveComponent;
  let fixture: ComponentFixture<DialogReviseApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReviseApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogReviseApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
