import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareStep1Component } from './compare-step1.component';

describe('CompareStep1Component', () => {
  let component: CompareStep1Component;
  let fixture: ComponentFixture<CompareStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
