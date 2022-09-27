import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4TwoComponent } from './step4-two.component';

describe('Step4TwoComponent', () => {
  let component: Step4TwoComponent;
  let fixture: ComponentFixture<Step4TwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4TwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4TwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
