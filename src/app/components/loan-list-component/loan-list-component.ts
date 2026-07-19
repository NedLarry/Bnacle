import { NgForOf, NgIf, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../Models/Roles';
import { UserDashboardModel } from '../../../Models/userDashboardModel';
import { FundedLoan } from '../../../Models/fundedLoan';

@Component({
  selector: 'app-loan-list-component',
  imports: [NgForOf, NgIf, DecimalPipe],
  templateUrl: './loan-list-component.html',
  styleUrl: './loan-list-component.css',
})
export class LoanListComponent implements OnInit {

  constructor (){}

  Roles = Roles;

  ngOnInit() {
    this.loadLoanList();
    this.loggedInUser = this.getLoggedInUserFromSessionStorage();
  }

  loggedInUser: UserDashboardModel | null = null;

  LoanList: any[] = [];

  LoanListMetadata ={
    TotalLoans: 0,
    TotalActive: 0,
    TotalBorrowed: 0,
    Outstanding: 0,
    Completed: 0
  }

  LoanListGridView: string = "";

  /**
   * Save loan list to session storage
   */
  saveLoanListToSessionStorage() {
    sessionStorage.setItem('loanList', JSON.stringify(this.LoanList));
  }

  /**
   * Retrieve loan list from session storage
   */
  getLoanListFromSessionStorage() {
    const cachedLoanList = sessionStorage.getItem('loanList');
    return cachedLoanList ? JSON.parse(cachedLoanList) : null;
  }

  /**
   * Load loan list - checks session storage first before any network call
   */
  loadLoanList() {
    const cachedLoanList = this.getLoanListFromSessionStorage();

    if (cachedLoanList) {
      // Use cached data from session storage
      this.LoanList = cachedLoanList;
      console.log('Loaded loan list from session storage:', this.LoanList);
    } else {
      // Make network call to fetch loan list (when backend is ready)
      this.fetchLoanListFromServer();
      // Save to session storage for future use
      this.saveLoanListToSessionStorage();
    }
  }

  /**
   * Fetch loan list from server (network call)
   */
  fetchLoanListFromServer() {
    // TODO: Replace with actual API call
    // Example: this.http.get('/api/loans').subscribe(data => { ... });
    console.log('Fetching loan list from server...');
    this.LoanList = this.mockFetchLoanList();
  }

  /**
   * Mock fetch loan list (remove when real API is implemented)
   */
  private mockFetchLoanList(): any[] {
    return [
      {
        loanId: 1,
        BorrowerName: 'Chidinma Eze',
        Amount: 50000,
        RepaymentAmount: 65000,
        RepaymentDate: '2026-08-15',
        LoanPurpose: 'Business expansion',
        LoanType: 'Business Loan',
        Status: 'pending',
      },
      {
        loanId: 2,
        BorrowerName: 'Tunde Bakare',
        Amount: 20000,
        RepaymentAmount: 24000,
        RepaymentDate: '2026-09-01',
        LoanPurpose: 'Medical expenses',
        LoanType: 'Personal Loan',
        Status: 'pending',
      },
    ];
  }

  /**
   * Clear loan list from session storage (e.g., on logout)
   */
  clearLoanListFromSessionStorage() {
    sessionStorage.removeItem('loanList');
    console.log('Cleared loan list from session storage');
  }

  /**
   * Retrieve the logged-in user from session storage
   */
  getLoggedInUserFromSessionStorage(): UserDashboardModel | null {
    const item = sessionStorage.getItem('LoggedInUser');
    return item ? JSON.parse(item) : null;
  }

  /**
   * Loaner action: approve and fund a pending loan request.
   * Marks the loan as funded in the marketplace and adds it to the
   * logged-in Loaner's FundedLoans so their dashboard stats stay in sync.
   */
  approveAndFund(loan: any) {
    if (!this.loggedInUser || this.loggedInUser.Role !== Roles.Loaner) {
      return;
    }

    const now = new Date().toISOString();
    const fundedLoan: FundedLoan = {
      LoanId: String(loan.loanId),
      BorrowerName: loan.BorrowerName,
      Amount: loan.Amount,
      PaybackDate: loan.RepaymentDate,
      Status: 'active',
      ApprovedBy: this.loggedInUser.email,
      ApprovedAt: now,
      DisbursedAt: now,
    };

    this.loggedInUser.FundedLoans = [...(this.loggedInUser.FundedLoans ?? []), fundedLoan];
    sessionStorage.setItem('LoggedInUser', JSON.stringify(this.loggedInUser));

    loan.Status = 'funded';
    this.saveLoanListToSessionStorage();
  }
}
