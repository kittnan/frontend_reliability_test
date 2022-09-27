import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeSectionHeadComponent } from './qe-section-head.component';

describe('QeSectionHeadComponent', () => {
  let component: QeSectionHeadComponent;
  let fixture: ComponentFixture<QeSectionHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeSectionHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeSectionHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
