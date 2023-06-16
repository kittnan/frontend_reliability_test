import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeEngineerReviseTableComponent } from './qe-engineer-revise-table.component';

describe('QeEngineerReviseTableComponent', () => {
  let component: QeEngineerReviseTableComponent;
  let fixture: ComponentFixture<QeEngineerReviseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeEngineerReviseTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeEngineerReviseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
