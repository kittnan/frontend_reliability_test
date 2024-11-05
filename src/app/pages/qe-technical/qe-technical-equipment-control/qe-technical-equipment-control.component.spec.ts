import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeTechnicalEquipmentControlComponent } from './qe-technical-equipment-control.component';

describe('QeTechnicalEquipmentControlComponent', () => {
  let component: QeTechnicalEquipmentControlComponent;
  let fixture: ComponentFixture<QeTechnicalEquipmentControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeTechnicalEquipmentControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeTechnicalEquipmentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
