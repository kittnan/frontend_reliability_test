import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeSectionHeadManageComponent } from './qe-section-head-manage.component';

describe('QeSectionHeadManageComponent', () => {
  let component: QeSectionHeadManageComponent;
  let fixture: ComponentFixture<QeSectionHeadManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeSectionHeadManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeSectionHeadManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
