import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOverviewComponent } from './loan-overview-component';

describe('LoanOverviewComponent', () => {
  let component: LoanOverviewComponent;
  let fixture: ComponentFixture<LoanOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanOverviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
