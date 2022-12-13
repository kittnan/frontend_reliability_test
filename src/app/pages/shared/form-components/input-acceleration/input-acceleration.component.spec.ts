import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAccelerationComponent } from './input-acceleration.component';

describe('InputAccelerationComponent', () => {
  let component: InputAccelerationComponent;
  let fixture: ComponentFixture<InputAccelerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAccelerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAccelerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
