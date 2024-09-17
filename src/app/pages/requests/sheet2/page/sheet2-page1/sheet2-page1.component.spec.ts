import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet2Page1Component } from './sheet2-page1.component';

describe('Sheet2Page1Component', () => {
  let component: Sheet2Page1Component;
  let fixture: ComponentFixture<Sheet2Page1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sheet2Page1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet2Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
