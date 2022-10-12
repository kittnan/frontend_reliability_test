import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingConditionTableComponent } from './testing-condition-table.component';

describe('TestingConditionTableComponent', () => {
  let component: TestingConditionTableComponent;
  let fixture: ComponentFixture<TestingConditionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingConditionTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingConditionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
