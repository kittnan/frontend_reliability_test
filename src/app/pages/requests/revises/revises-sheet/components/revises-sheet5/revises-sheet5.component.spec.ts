import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesSheet5Component } from './revises-sheet5.component';

describe('RevisesSheet5Component', () => {
  let component: RevisesSheet5Component;
  let fixture: ComponentFixture<RevisesSheet5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesSheet5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesSheet5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
