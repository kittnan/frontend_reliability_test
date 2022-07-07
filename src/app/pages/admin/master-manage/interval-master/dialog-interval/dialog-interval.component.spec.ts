import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIntervalComponent } from './dialog-interval.component';

describe('DialogIntervalComponent', () => {
  let component: DialogIntervalComponent;
  let fixture: ComponentFixture<DialogIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogIntervalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
