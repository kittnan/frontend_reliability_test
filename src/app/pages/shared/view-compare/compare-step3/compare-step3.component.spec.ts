import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareStep3Component } from './compare-step3.component';

describe('CompareStep3Component', () => {
  let component: CompareStep3Component;
  let fixture: ComponentFixture<CompareStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
