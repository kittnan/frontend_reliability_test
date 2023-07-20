import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareStep2Component } from './compare-step2.component';

describe('CompareStep2Component', () => {
  let component: CompareStep2Component;
  let fixture: ComponentFixture<CompareStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
