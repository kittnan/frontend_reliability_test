import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesQueuesComponent } from './revises-queues.component';

describe('RevisesQueuesComponent', () => {
  let component: RevisesQueuesComponent;
  let fixture: ComponentFixture<RevisesQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesQueuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
