import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplyComponent } from './loan-apply-component';

describe('LoanApplyComponent', () => {
  let component: LoanApplyComponent;
  let fixture: ComponentFixture<LoanApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApplyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanApplyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
