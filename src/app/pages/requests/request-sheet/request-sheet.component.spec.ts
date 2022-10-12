import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSheetComponent } from './request-sheet.component';

describe('RequestSheetComponent', () => {
  let component: RequestSheetComponent;
  let fixture: ComponentFixture<RequestSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
