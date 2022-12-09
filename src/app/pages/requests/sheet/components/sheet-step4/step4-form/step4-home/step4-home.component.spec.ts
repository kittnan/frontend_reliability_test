import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4HomeComponent } from './step4-home.component';

describe('Step4HomeComponent', () => {
  let component: Step4HomeComponent;
  let fixture: ComponentFixture<Step4HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
