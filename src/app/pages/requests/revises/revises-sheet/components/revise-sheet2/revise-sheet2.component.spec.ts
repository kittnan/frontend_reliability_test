import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseSheet2Component } from './revise-sheet2.component';

describe('ReviseSheet2Component', () => {
  let component: ReviseSheet2Component;
  let fixture: ComponentFixture<ReviseSheet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviseSheet2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviseSheet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
