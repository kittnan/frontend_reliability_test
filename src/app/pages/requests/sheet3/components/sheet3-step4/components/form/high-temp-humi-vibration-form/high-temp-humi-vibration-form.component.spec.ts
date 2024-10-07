import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighTempHumiVibrationFormComponent } from './high-temp-humi-vibration-form.component';

describe('HighTempHumiVibrationFormComponent', () => {
  let component: HighTempHumiVibrationFormComponent;
  let fixture: ComponentFixture<HighTempHumiVibrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighTempHumiVibrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighTempHumiVibrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
