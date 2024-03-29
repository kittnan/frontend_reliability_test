import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDirectionComponent } from './input-direction.component';

describe('InputDirectionComponent', () => {
  let component: InputDirectionComponent;
  let fixture: ComponentFixture<InputDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
