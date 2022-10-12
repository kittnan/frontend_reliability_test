import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingConditionFormComponent } from './testing-condition-form.component';

describe('TestingConditionFormComponent', () => {
  let component: TestingConditionFormComponent;
  let fixture: ComponentFixture<TestingConditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingConditionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingConditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
