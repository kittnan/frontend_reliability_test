import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConditionComponent } from './model-condition.component';

describe('ModelConditionComponent', () => {
  let component: ModelConditionComponent;
  let fixture: ComponentFixture<ModelConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
