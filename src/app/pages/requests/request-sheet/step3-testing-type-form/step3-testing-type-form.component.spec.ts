import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3TestingTypeFormComponent } from './step3-testing-type-form.component';

describe('Step3TestingTypeFormComponent', () => {
  let component: Step3TestingTypeFormComponent;
  let fixture: ComponentFixture<Step3TestingTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step3TestingTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3TestingTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
