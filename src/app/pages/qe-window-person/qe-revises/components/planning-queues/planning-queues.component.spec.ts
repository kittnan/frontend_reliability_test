import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningQueuesComponent } from './planning-queues.component';

describe('PlanningQueuesComponent', () => {
  let component: PlanningQueuesComponent;
  let fixture: ComponentFixture<PlanningQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningQueuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
