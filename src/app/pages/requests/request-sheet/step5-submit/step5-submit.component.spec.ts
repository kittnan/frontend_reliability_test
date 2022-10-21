import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step5SubmitComponent } from './step5-submit.component';

describe('Step5SubmitComponent', () => {
  let component: Step5SubmitComponent;
  let fixture: ComponentFixture<Step5SubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step5SubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step5SubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
