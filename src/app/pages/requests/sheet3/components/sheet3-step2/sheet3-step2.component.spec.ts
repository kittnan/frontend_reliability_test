import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet3Step2Component } from './sheet3-step2.component';

describe('Sheet3Step2Component', () => {
  let component: Sheet3Step2Component;
  let fixture: ComponentFixture<Sheet3Step2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sheet3Step2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet3Step2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
