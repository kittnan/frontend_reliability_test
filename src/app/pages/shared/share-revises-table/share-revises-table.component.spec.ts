import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareRevisesTableComponent } from './share-revises-table.component';

describe('ShareRevisesTableComponent', () => {
  let component: ShareRevisesTableComponent;
  let fixture: ComponentFixture<ShareRevisesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareRevisesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareRevisesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
