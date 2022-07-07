import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModelMasterComponent } from './dialog-model-master.component';

describe('DialogModelMasterComponent', () => {
  let component: DialogModelMasterComponent;
  let fixture: ComponentFixture<DialogModelMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModelMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogModelMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
