import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperateRemainComponent } from './table-operate-remain.component';

describe('TableOperateRemainComponent', () => {
  let component: TableOperateRemainComponent;
  let fixture: ComponentFixture<TableOperateRemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOperateRemainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOperateRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
