import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4HighLowComponent } from './step4-high-low.component';

describe('Step4HighLowComponent', () => {
  let component: Step4HighLowComponent;
  let fixture: ComponentFixture<Step4HighLowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4HighLowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4HighLowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
