import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanReliabilityTestComponent } from './plan-reliability-test.component';

describe('PlanReliabilityTestComponent', () => {
  let component: PlanReliabilityTestComponent;
  let fixture: ComponentFixture<PlanReliabilityTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanReliabilityTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanReliabilityTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
