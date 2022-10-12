import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingConditionMasterComponent } from './testing-condition-master.component';

describe('TestingConditionMasterComponent', () => {
  let component: TestingConditionMasterComponent;
  let fixture: ComponentFixture<TestingConditionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingConditionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingConditionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
