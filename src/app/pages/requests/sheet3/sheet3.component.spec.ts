import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sheet3Component } from './sheet3.component';

describe('Sheet3Component', () => {
  let component: Sheet3Component;
  let fixture: ComponentFixture<Sheet3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sheet3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sheet3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
