import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRemainComponent } from './daily-remain.component';

describe('DailyRemainComponent', () => {
  let component: DailyRemainComponent;
  let fixture: ComponentFixture<DailyRemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyRemainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
