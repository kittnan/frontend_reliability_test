import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionTableNoChamberComponent } from './condition-table-no-chamber.component';

describe('ConditionTableNoChamberComponent', () => {
  let component: ConditionTableNoChamberComponent;
  let fixture: ComponentFixture<ConditionTableNoChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionTableNoChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionTableNoChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
