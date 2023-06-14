import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesSheet1Component } from './revises-sheet1.component';

describe('RevisesSheet1Component', () => {
  let component: RevisesSheet1Component;
  let fixture: ComponentFixture<RevisesSheet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesSheet1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesSheet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
