import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialyRemainComponent } from './dialy-remain.component';

describe('DialyRemainComponent', () => {
  let component: DialyRemainComponent;
  let fixture: ComponentFixture<DialyRemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialyRemainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialyRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
