import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceModeComponent } from './advance-mode.component';

describe('AdvanceModeComponent', () => {
  let component: AdvanceModeComponent;
  let fixture: ComponentFixture<AdvanceModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
