import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPurposeMasterComponent } from './test-purpose-master.component';

describe('TestPurposeMasterComponent', () => {
  let component: TestPurposeMasterComponent;
  let fixture: ComponentFixture<TestPurposeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPurposeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPurposeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
