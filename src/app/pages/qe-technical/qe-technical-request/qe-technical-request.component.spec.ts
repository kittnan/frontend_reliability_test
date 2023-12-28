import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeTechnicalRequestComponent } from './qe-technical-request.component';

describe('QeTechnicalRequestComponent', () => {
  let component: QeTechnicalRequestComponent;
  let fixture: ComponentFixture<QeTechnicalRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeTechnicalRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeTechnicalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
