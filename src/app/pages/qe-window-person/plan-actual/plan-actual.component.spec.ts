import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanActualComponent } from './plan-actual.component';

describe('PlanActualComponent', () => {
  let component: PlanActualComponent;
  let fixture: ComponentFixture<PlanActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanActualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
