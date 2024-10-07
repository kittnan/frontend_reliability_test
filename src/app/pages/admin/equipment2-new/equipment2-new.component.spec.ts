import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equipment2NewComponent } from './equipment2-new.component';

describe('Equipment2NewComponent', () => {
  let component: Equipment2NewComponent;
  let fixture: ComponentFixture<Equipment2NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Equipment2NewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Equipment2NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
