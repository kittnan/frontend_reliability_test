import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFunctionChamberComponent } from './dialog-function-chamber.component';

describe('DialogFunctionChamberComponent', () => {
  let component: DialogFunctionChamberComponent;
  let fixture: ComponentFixture<DialogFunctionChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFunctionChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFunctionChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
