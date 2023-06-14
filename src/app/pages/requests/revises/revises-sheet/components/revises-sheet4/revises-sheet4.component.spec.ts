import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesSheet4Component } from './revises-sheet4.component';

describe('RevisesSheet4Component', () => {
  let component: RevisesSheet4Component;
  let fixture: ComponentFixture<RevisesSheet4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesSheet4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesSheet4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
