import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighLowFormComponentComponent } from './high-low-form-component.component';

describe('HighLowFormComponentComponent', () => {
  let component: HighLowFormComponentComponent;
  let fixture: ComponentFixture<HighLowFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighLowFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighLowFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
