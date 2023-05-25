import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesTableShareComponent } from './revises-table-share.component';

describe('RevisesTableShareComponent', () => {
  let component: RevisesTableShareComponent;
  let fixture: ComponentFixture<RevisesTableShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesTableShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesTableShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
