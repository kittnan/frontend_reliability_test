import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeChamberComponent } from './qe-chamber.component';

describe('QeChamberComponent', () => {
  let component: QeChamberComponent;
  let fixture: ComponentFixture<QeChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
