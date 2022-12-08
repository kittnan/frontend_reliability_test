/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetStep2Component } from './sheet-step2.component';

describe('SheetStep2Component', () => {
  let component: SheetStep2Component;
  let fixture: ComponentFixture<SheetStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
