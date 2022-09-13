import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4DoneComponent } from './step4-done.component';

describe('Step4DoneComponent', () => {
  let component: Step4DoneComponent;
  let fixture: ComponentFixture<Step4DoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4DoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4DoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
