import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQeOperateComponent } from './dialog-qe-operate.component';

describe('DialogQeOperateComponent', () => {
  let component: DialogQeOperateComponent;
  let fixture: ComponentFixture<DialogQeOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQeOperateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogQeOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
