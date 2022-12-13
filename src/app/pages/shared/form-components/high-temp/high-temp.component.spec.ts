import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighTempComponent } from './high-temp.component';

describe('HighTempComponent', () => {
  let component: HighTempComponent;
  let fixture: ComponentFixture<HighTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
