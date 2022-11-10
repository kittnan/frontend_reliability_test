import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberTableComponent } from './chamber-table.component';

describe('ChamberTableComponent', () => {
  let component: ChamberTableComponent;
  let fixture: ComponentFixture<ChamberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamberTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
