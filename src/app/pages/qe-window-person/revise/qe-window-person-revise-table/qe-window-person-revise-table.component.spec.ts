import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeWindowPersonReviseTableComponent } from './qe-window-person-revise-table.component';

describe('QeWindowPersonReviseTableComponent', () => {
  let component: QeWindowPersonReviseTableComponent;
  let fixture: ComponentFixture<QeWindowPersonReviseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeWindowPersonReviseTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeWindowPersonReviseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
