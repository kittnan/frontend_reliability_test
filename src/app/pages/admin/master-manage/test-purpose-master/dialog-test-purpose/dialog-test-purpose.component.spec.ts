import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTestPurposeComponent } from './dialog-test-purpose.component';

describe('DialogTestPurposeComponent', () => {
  let component: DialogTestPurposeComponent;
  let fixture: ComponentFixture<DialogTestPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTestPurposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTestPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
