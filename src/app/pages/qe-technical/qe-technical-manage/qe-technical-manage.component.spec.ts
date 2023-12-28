import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeTechnicalManageComponent } from './qe-technical-manage.component';

describe('QeTechnicalManageComponent', () => {
  let component: QeTechnicalManageComponent;
  let fixture: ComponentFixture<QeTechnicalManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeTechnicalManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeTechnicalManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
