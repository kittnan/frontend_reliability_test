import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeatShockComponent } from './form-heat-shock.component';

describe('FormHeatShockComponent', () => {
  let component: FormHeatShockComponent;
  let fixture: ComponentFixture<FormHeatShockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHeatShockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHeatShockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
