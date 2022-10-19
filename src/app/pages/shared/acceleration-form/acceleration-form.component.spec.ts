import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelerationFormComponent } from './acceleration-form.component';

describe('AccelerationFormComponent', () => {
  let component: AccelerationFormComponent;
  let fixture: ComponentFixture<AccelerationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccelerationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccelerationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
