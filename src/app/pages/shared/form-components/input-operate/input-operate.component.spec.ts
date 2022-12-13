import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOperateComponent } from './input-operate.component';

describe('InputOperateComponent', () => {
  let component: InputOperateComponent;
  let fixture: ComponentFixture<InputOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOperateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
