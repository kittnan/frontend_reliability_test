import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingConditionComponent } from './testing-condition.component';

describe('TestingConditionComponent', () => {
  let component: TestingConditionComponent;
  let fixture: ComponentFixture<TestingConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
