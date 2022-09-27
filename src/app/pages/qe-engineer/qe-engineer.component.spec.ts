import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeEngineerComponent } from './qe-engineer.component';

describe('QeEngineerComponent', () => {
  let component: QeEngineerComponent;
  let fixture: ComponentFixture<QeEngineerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeEngineerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
