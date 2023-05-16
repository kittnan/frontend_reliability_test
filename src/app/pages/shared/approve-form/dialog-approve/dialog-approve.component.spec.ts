import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogApproveComponent } from './dialog-approve.component';

describe('DialogApproveComponent', () => {
  let component: DialogApproveComponent;
  let fixture: ComponentFixture<DialogApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
