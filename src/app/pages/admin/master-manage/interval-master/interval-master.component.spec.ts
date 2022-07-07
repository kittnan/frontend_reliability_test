import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalMasterComponent } from './interval-master.component';

describe('IntervalMasterComponent', () => {
  let component: IntervalMasterComponent;
  let fixture: ComponentFixture<IntervalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
