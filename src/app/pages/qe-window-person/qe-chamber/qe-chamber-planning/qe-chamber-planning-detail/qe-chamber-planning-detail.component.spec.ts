import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeChamberPlanningDetailComponent } from './qe-chamber-planning-detail.component';

describe('QeChamberPlanningDetailComponent', () => {
  let component: QeChamberPlanningDetailComponent;
  let fixture: ComponentFixture<QeChamberPlanningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeChamberPlanningDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeChamberPlanningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
