import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQeChamberComponent } from './dialog-qe-chamber.component';

describe('DialogQeChamberComponent', () => {
  let component: DialogQeChamberComponent;
  let fixture: ComponentFixture<DialogQeChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQeChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogQeChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
