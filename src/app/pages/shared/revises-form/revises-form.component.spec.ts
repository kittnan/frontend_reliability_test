import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesFormComponent } from './revises-form.component';

describe('RevisesFormComponent', () => {
  let component: RevisesFormComponent;
  let fixture: ComponentFixture<RevisesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
