import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighTempHumiFormComponent } from './high-temp-humi-form.component';

describe('HighTempHumiFormComponent', () => {
  let component: HighTempHumiFormComponent;
  let fixture: ComponentFixture<HighTempHumiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighTempHumiFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighTempHumiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
