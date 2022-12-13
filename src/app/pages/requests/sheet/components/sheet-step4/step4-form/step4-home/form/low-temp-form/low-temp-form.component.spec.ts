import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowTempFormComponent } from './low-temp-form.component';

describe('LowTempFormComponent', () => {
  let component: LowTempFormComponent;
  let fixture: ComponentFixture<LowTempFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowTempFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowTempFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
