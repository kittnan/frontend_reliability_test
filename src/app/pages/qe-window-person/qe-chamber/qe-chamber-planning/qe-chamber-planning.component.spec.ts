import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeChamberPlanningComponent } from './qe-chamber-planning.component';

describe('QeChamberPlanningComponent', () => {
  let component: QeChamberPlanningComponent;
  let fixture: ComponentFixture<QeChamberPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeChamberPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeChamberPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
