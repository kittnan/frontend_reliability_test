import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDateStartInspectionComponent } from './dialog-date-start-inspection.component';

describe('DialogDateStartInspectionComponent', () => {
  let component: DialogDateStartInspectionComponent;
  let fixture: ComponentFixture<DialogDateStartInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDateStartInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDateStartInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
