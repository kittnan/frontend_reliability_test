import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeWindowPersonComponent } from './qe-window-person.component';

describe('QeWindowPersonComponent', () => {
  let component: QeWindowPersonComponent;
  let fixture: ComponentFixture<QeWindowPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeWindowPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeWindowPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
