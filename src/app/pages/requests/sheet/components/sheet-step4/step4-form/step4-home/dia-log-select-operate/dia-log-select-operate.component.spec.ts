import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaLogSelectOperateComponent } from './dia-log-select-operate.component';

describe('DiaLogSelectOperateComponent', () => {
  let component: DiaLogSelectOperateComponent;
  let fixture: ComponentFixture<DiaLogSelectOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaLogSelectOperateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaLogSelectOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
