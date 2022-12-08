/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetStep4Component } from './sheet-step4.component';

describe('SheetStep4Component', () => {
  let component: SheetStep4Component;
  let fixture: ComponentFixture<SheetStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetStep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
