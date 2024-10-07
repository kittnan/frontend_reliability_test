import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatShockComponent } from './heat-shock.component';

describe('HeatShockComponent', () => {
  let component: HeatShockComponent;
  let fixture: ComponentFixture<HeatShockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatShockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatShockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
