import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4HumiComponent } from './step4-humi.component';

describe('Step4HumiComponent', () => {
  let component: Step4HumiComponent;
  let fixture: ComponentFixture<Step4HumiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4HumiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4HumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
