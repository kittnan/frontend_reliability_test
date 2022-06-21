import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2TestPurposeComponent } from './step2-test-purpose.component';

describe('Step2TestPurposeComponent', () => {
  let component: Step2TestPurposeComponent;
  let fixture: ComponentFixture<Step2TestPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step2TestPurposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2TestPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
