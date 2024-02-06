import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGanttEquipmentComponent } from './dashboard-gantt-equipment.component';

describe('DashboardGanttEquipmentComponent', () => {
  let component: DashboardGanttEquipmentComponent;
  let fixture: ComponentFixture<DashboardGanttEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGanttEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGanttEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
