import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareStep4Component } from './compare-step4.component';

describe('CompareStep4Component', () => {
  let component: CompareStep4Component;
  let fixture: ComponentFixture<CompareStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareStep4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
