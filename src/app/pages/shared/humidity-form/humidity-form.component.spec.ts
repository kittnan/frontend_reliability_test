import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityFormComponent } from './humidity-form.component';

describe('HumidityFormComponent', () => {
  let component: HumidityFormComponent;
  let fixture: ComponentFixture<HumidityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumidityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
