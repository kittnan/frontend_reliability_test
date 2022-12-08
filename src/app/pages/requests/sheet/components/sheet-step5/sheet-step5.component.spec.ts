/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetStep5Component } from './sheet-step5.component';

describe('SheetStep5Component', () => {
  let component: SheetStep5Component;
  let fixture: ComponentFixture<SheetStep5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetStep5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
