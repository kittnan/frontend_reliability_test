import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInspecFormComponent } from './time-inspec-form.component';

describe('TimeInspecFormComponent', () => {
  let component: TimeInspecFormComponent;
  let fixture: ComponentFixture<TimeInspecFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeInspecFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeInspecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
