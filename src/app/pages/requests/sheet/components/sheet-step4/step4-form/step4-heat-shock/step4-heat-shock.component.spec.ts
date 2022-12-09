import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4HeatShockComponent } from './step4-heat-shock.component';

describe('Step4HeatShockComponent', () => {
  let component: Step4HeatShockComponent;
  let fixture: ComponentFixture<Step4HeatShockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4HeatShockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4HeatShockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
