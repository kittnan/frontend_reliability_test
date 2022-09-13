import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAuthorizeComponent } from './dialog-authorize.component';

describe('DialogAuthorizeComponent', () => {
  let component: DialogAuthorizeComponent;
  let fixture: ComponentFixture<DialogAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAuthorizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
