import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet3Step4Component } from './sheet3-step4.component';

describe('Sheet3Step4Component', () => {
  let component: Sheet3Step4Component;
  let fixture: ComponentFixture<Sheet3Step4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sheet3Step4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet3Step4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
