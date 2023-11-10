import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetail2Component } from './plan-detail2.component';

describe('PlanDetail2Component', () => {
  let component: PlanDetail2Component;
  let fixture: ComponentFixture<PlanDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanDetail2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
