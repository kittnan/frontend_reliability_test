import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesSheet3Component } from './revises-sheet3.component';

describe('RevisesSheet3Component', () => {
  let component: RevisesSheet3Component;
  let fixture: ComponentFixture<RevisesSheet3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesSheet3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesSheet3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
