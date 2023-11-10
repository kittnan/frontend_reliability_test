import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetail3Component } from './plan-detail3.component';

describe('PlanDetail3Component', () => {
  let component: PlanDetail3Component;
  let fixture: ComponentFixture<PlanDetail3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanDetail3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDetail3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
