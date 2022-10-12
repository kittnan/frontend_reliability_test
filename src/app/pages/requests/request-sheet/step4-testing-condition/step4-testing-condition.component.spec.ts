import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4TestingConditionComponent } from './step4-testing-condition.component';

describe('Step4TestingConditionComponent', () => {
  let component: Step4TestingConditionComponent;
  let fixture: ComponentFixture<Step4TestingConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4TestingConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4TestingConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
