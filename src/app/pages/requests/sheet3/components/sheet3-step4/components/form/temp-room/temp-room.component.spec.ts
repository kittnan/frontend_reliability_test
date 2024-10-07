import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempRoomComponent } from './temp-room.component';

describe('TempRoomComponent', () => {
  let component: TempRoomComponent;
  let fixture: ComponentFixture<TempRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
