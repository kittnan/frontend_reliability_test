import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseSheet3Component } from './revise-sheet3.component';

describe('ReviseSheet3Component', () => {
  let component: ReviseSheet3Component;
  let fixture: ComponentFixture<ReviseSheet3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviseSheet3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviseSheet3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
