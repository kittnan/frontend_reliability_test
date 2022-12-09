import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4VibrationComponent } from './step4-vibration.component';

describe('Step4VibrationComponent', () => {
  let component: Step4VibrationComponent;
  let fixture: ComponentFixture<Step4VibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4VibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4VibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
