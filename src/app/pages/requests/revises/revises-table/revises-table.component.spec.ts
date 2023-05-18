import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesTableComponent } from './revises-table.component';

describe('RevisesTableComponent', () => {
  let component: RevisesTableComponent;
  let fixture: ComponentFixture<RevisesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
