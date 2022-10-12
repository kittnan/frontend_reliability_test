import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempHumiFormComponentComponent } from './temp-humi-form-component.component';

describe('TempHumiFormComponentComponent', () => {
  let component: TempHumiFormComponentComponent;
  let fixture: ComponentFixture<TempHumiFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempHumiFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempHumiFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
