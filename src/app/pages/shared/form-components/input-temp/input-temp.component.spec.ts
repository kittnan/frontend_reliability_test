import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTempComponent } from './input-temp.component';

describe('InputTempComponent', () => {
  let component: InputTempComponent;
  let fixture: ComponentFixture<InputTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
