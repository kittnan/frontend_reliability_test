import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlaningComponent } from './table-planing.component';

describe('TablePlaningComponent', () => {
  let component: TablePlaningComponent;
  let fixture: ComponentFixture<TablePlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePlaningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
