import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHumiComponent } from './input-humi.component';

describe('InputHumiComponent', () => {
  let component: InputHumiComponent;
  let fixture: ComponentFixture<InputHumiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputHumiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputHumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
