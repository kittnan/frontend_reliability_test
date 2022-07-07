import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingTypeMasterComponent } from './testing-type-master.component';

describe('TestingTypeMasterComponent', () => {
  let component: TestingTypeMasterComponent;
  let fixture: ComponentFixture<TestingTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingTypeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
