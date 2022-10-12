import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempFormComponentComponent } from './temp-form-component.component';

describe('TempFormComponentComponent', () => {
  let component: TempFormComponentComponent;
  let fixture: ComponentFixture<TempFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
