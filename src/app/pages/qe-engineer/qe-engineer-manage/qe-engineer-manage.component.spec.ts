import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeEngineerManageComponent } from './qe-engineer-manage.component';

describe('QeEngineerManageComponent', () => {
  let component: QeEngineerManageComponent;
  let fixture: ComponentFixture<QeEngineerManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeEngineerManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeEngineerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
