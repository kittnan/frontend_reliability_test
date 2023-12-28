import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeTechnicalComponent } from './qe-technical.component';

describe('QeTechnicalComponent', () => {
  let component: QeTechnicalComponent;
  let fixture: ComponentFixture<QeTechnicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeTechnicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
