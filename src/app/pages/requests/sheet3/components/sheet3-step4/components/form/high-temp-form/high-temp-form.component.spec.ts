import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighTempFormComponent } from './high-temp-form.component';

describe('HighTempFormComponent', () => {
  let component: HighTempFormComponent;
  let fixture: ComponentFixture<HighTempFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighTempFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighTempFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
