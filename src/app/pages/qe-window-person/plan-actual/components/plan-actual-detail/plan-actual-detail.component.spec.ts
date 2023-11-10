import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanActualDetailComponent } from './plan-actual-detail.component';

describe('PlanActualDetailComponent', () => {
  let component: PlanActualDetailComponent;
  let fixture: ComponentFixture<PlanActualDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanActualDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanActualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
