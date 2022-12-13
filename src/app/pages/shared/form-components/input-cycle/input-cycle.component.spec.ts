import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCycleComponent } from './input-cycle.component';

describe('InputCycleComponent', () => {
  let component: InputCycleComponent;
  let fixture: ComponentFixture<InputCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
