import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1DetailComponent } from './step1-detail.component';

describe('Step1DetailComponent', () => {
  let component: Step1DetailComponent;
  let fixture: ComponentFixture<Step1DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step1DetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
