import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1RequestComponent } from './step1-request.component';

describe('Step1RequestComponent', () => {
  let component: Step1RequestComponent;
  let fixture: ComponentFixture<Step1RequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step1RequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
