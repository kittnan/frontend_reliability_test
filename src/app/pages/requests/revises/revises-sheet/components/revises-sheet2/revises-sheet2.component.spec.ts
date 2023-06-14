import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesSheet2Component } from './revises-sheet2.component';

describe('RevisesSheet2Component', () => {
  let component: RevisesSheet2Component;
  let fixture: ComponentFixture<RevisesSheet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesSheet2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesSheet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
