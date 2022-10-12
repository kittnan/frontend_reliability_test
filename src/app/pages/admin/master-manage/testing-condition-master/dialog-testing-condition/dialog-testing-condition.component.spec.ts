import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTestingConditionComponent } from './dialog-testing-condition.component';

describe('DialogTestingConditionComponent', () => {
  let component: DialogTestingConditionComponent;
  let fixture: ComponentFixture<DialogTestingConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTestingConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTestingConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
