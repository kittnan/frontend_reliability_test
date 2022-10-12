import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatShockFormComponentComponent } from './heat-shock-form-component.component';

describe('HeatShockFormComponentComponent', () => {
  let component: HeatShockFormComponentComponent;
  let fixture: ComponentFixture<HeatShockFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatShockFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatShockFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
