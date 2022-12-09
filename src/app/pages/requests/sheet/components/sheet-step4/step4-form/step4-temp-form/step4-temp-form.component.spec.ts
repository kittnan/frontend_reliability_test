import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4TempFormComponent } from './step4-temp-form.component';

describe('Step4TempFormComponent', () => {
  let component: Step4TempFormComponent;
  let fixture: ComponentFixture<Step4TempFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4TempFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4TempFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
