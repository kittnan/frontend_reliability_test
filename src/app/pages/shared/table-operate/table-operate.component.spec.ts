import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperateComponent } from './table-operate.component';

describe('TableOperateComponent', () => {
  let component: TableOperateComponent;
  let fixture: ComponentFixture<TableOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOperateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
