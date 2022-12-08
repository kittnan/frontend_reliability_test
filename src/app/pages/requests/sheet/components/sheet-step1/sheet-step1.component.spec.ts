/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetStep1Component } from './sheet-step1.component';

describe('SheetStep1Component', () => {
  let component: SheetStep1Component;
  let fixture: ComponentFixture<SheetStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
