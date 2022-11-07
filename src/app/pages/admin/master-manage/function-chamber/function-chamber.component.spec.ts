import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionChamberComponent } from './function-chamber.component';

describe('FunctionChamberComponent', () => {
  let component: FunctionChamberComponent;
  let fixture: ComponentFixture<FunctionChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
