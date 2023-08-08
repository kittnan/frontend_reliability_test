import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRemain2Component } from './daily-remain2.component';

describe('DailyRemain2Component', () => {
  let component: DailyRemain2Component;
  let fixture: ComponentFixture<DailyRemain2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyRemain2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyRemain2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
