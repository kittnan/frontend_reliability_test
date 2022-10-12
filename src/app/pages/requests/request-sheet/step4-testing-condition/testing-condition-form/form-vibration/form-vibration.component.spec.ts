import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVibrationComponent } from './form-vibration.component';

describe('FormVibrationComponent', () => {
  let component: FormVibrationComponent;
  let fixture: ComponentFixture<FormVibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
