import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equipment2Component } from './equipment2.component';

describe('Equipment2Component', () => {
  let component: Equipment2Component;
  let fixture: ComponentFixture<Equipment2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Equipment2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Equipment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
