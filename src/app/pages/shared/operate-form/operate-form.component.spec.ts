import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperateFormComponent } from './operate-form.component';

describe('OperateFormComponent', () => {
  let component: OperateFormComponent;
  let fixture: ComponentFixture<OperateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
