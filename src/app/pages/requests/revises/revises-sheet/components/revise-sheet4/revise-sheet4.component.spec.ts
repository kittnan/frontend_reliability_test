import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseSheet4Component } from './revise-sheet4.component';

describe('ReviseSheet4Component', () => {
  let component: ReviseSheet4Component;
  let fixture: ComponentFixture<ReviseSheet4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviseSheet4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviseSheet4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
