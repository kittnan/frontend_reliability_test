import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempHumiVibrationFormComponentComponent } from './temp-humi-vibration-form-component.component';

describe('TempHumiVibrationFormComponentComponent', () => {
  let component: TempHumiVibrationFormComponentComponent;
  let fixture: ComponentFixture<TempHumiVibrationFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempHumiVibrationFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempHumiVibrationFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
