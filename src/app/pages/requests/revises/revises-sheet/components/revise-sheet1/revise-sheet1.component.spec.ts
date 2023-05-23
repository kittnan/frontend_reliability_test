import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseSheet1Component } from './revise-sheet1.component';

describe('ReviseSheet1Component', () => {
  let component: ReviseSheet1Component;
  let fixture: ComponentFixture<ReviseSheet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviseSheet1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviseSheet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
