import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeTechnicalDetailComponent } from './qe-technical-detail.component';

describe('QeTechnicalDetailComponent', () => {
  let component: QeTechnicalDetailComponent;
  let fixture: ComponentFixture<QeTechnicalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeTechnicalDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeTechnicalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
