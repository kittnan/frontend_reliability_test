import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyFormComponent } from './qty-form.component';

describe('QtyFormComponent', () => {
  let component: QtyFormComponent;
  let fixture: ComponentFixture<QtyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
