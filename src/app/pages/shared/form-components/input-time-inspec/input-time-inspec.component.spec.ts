import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimeInspecComponent } from './input-time-inspec.component';

describe('InputTimeInspecComponent', () => {
  let component: InputTimeInspecComponent;
  let fixture: ComponentFixture<InputTimeInspecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTimeInspecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTimeInspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
