import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet3Step5Component } from './sheet3-step5.component';

describe('Sheet3Step5Component', () => {
  let component: Sheet3Step5Component;
  let fixture: ComponentFixture<Sheet3Step5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sheet3Step5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet3Step5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
