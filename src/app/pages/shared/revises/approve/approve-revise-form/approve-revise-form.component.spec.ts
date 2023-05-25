import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReviseFormComponent } from './approve-revise-form.component';

describe('ApproveReviseFormComponent', () => {
  let component: ApproveReviseFormComponent;
  let fixture: ComponentFixture<ApproveReviseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveReviseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveReviseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
