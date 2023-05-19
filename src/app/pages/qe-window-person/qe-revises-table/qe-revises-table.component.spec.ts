import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeRevisesTableComponent } from './qe-revises-table.component';

describe('QeRevisesTableComponent', () => {
  let component: QeRevisesTableComponent;
  let fixture: ComponentFixture<QeRevisesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeRevisesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeRevisesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
