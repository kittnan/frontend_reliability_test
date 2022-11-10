import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeChamberSelectComponent } from './qe-chamber-select.component';

describe('QeChamberSelectComponent', () => {
  let component: QeChamberSelectComponent;
  let fixture: ComponentFixture<QeChamberSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeChamberSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeChamberSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
