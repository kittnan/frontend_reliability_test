import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetail1Component } from './plan-detail1.component';

describe('PlanDetail1Component', () => {
  let component: PlanDetail1Component;
  let fixture: ComponentFixture<PlanDetail1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanDetail1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDetail1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
