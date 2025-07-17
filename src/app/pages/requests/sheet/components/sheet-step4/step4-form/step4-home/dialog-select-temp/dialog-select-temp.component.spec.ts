import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectTempComponent } from './dialog-select-temp.component';

describe('DialogSelectTempComponent', () => {
  let component: DialogSelectTempComponent;
  let fixture: ComponentFixture<DialogSelectTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSelectTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
