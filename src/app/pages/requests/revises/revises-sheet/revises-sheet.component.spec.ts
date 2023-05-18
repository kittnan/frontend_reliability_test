import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesSheetComponent } from './revises-sheet.component';

describe('RevisesSheetComponent', () => {
  let component: RevisesSheetComponent;
  let fixture: ComponentFixture<RevisesSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
