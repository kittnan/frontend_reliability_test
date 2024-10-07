import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet3Step1Component } from './sheet3-step1.component';

describe('Sheet3Step1Component', () => {
  let component: Sheet3Step1Component;
  let fixture: ComponentFixture<Sheet3Step1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sheet3Step1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet3Step1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
