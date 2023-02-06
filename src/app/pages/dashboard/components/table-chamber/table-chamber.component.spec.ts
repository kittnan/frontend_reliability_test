import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChamberComponent } from './table-chamber.component';

describe('TableChamberComponent', () => {
  let component: TableChamberComponent;
  let fixture: ComponentFixture<TableChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
