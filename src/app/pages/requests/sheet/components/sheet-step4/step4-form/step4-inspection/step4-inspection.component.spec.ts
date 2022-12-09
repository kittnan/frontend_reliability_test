import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4InspectionComponent } from './step4-inspection.component';

describe('Step4InspectionComponent', () => {
  let component: Step4InspectionComponent;
  let fixture: ComponentFixture<Step4InspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4InspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4InspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
