import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet3Step3Component } from './sheet3-step3.component';

describe('Sheet3Step3Component', () => {
  let component: Sheet3Step3Component;
  let fixture: ComponentFixture<Sheet3Step3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sheet3Step3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet3Step3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
