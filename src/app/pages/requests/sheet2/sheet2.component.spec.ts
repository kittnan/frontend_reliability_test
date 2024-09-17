import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet2Component } from './sheet2.component';

describe('Sheet2Component', () => {
  let component: Sheet2Component;
  let fixture: ComponentFixture<Sheet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sheet2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
