import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectDateComponent } from './dialog-select-date.component';

describe('DialogSelectDateComponent', () => {
  let component: DialogSelectDateComponent;
  let fixture: ComponentFixture<DialogSelectDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
