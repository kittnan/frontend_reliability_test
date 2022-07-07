import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeMasterComponent } from './authorize-master.component';

describe('AuthorizeMasterComponent', () => {
  let component: AuthorizeMasterComponent;
  let fixture: ComponentFixture<AuthorizeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
