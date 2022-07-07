import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTestingTypeComponent } from './dialog-testing-type.component';

describe('DialogTestingTypeComponent', () => {
  let component: DialogTestingTypeComponent;
  let fixture: ComponentFixture<DialogTestingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTestingTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTestingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
