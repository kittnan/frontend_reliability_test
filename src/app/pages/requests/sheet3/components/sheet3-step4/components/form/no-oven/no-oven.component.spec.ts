import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOvenComponent } from './no-oven.component';

describe('NoOvenComponent', () => {
  let component: NoOvenComponent;
  let fixture: ComponentFixture<NoOvenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoOvenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoOvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
