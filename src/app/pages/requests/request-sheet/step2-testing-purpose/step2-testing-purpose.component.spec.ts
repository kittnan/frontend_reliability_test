import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2TestingPurposeComponent } from './step2-testing-purpose.component';

describe('Step2TestingPurposeComponent', () => {
  let component: Step2TestingPurposeComponent;
  let fixture: ComponentFixture<Step2TestingPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step2TestingPurposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2TestingPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
