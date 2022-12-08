/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetStep3Component } from './sheet-step3.component';

describe('SheetStep3Component', () => {
  let component: SheetStep3Component;
  let fixture: ComponentFixture<SheetStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
