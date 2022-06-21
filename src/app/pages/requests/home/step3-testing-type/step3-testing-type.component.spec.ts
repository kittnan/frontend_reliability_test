import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3TestingTypeComponent } from './step3-testing-type.component';

describe('Step3TestingTypeComponent', () => {
  let component: Step3TestingTypeComponent;
  let fixture: ComponentFixture<Step3TestingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step3TestingTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3TestingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
