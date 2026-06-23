import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-list-component',
  imports: [],
  templateUrl: './loan-list-component.html',
  styleUrl: './loan-list-component.css',
})
export class LoanListComponent implements OnInit {

  constructor (){}

  ngOnInit() {
    this.loadLoanList();
  }


  LoanList = [
    {
      loanId: 1,
      Amount: 50000,
      RepaidAmount: 65000,
      RepaymentDate: '07-07-2030',
      LoanPurpose: "For test for request",
      LoanType: "Ranged"
    
    }
  ];

  LoanListMetadata ={
    TotalLoans: 6,
    TotalActive: 2,
    TotalBorrowed: 6,
    Outstanding: 0,
    Completed: 0
  }


  UserToReturn: any = {
    userId: '1',
    firstName: 'Adeola',
    lastName: 'Okonkwo',
    email: 'AOkonkwo@gmail.com',
    phoneNumber: '08012345678',
    TotalBorowed: 100000,
    TotalRepaid: 50000,
    TotalOutstanding: 50000,
    Loan: [{ loanId: 'loan1', amount: 100000, status: 'active', repaymentSchedule: 'monthly', repaymentAmount: 10000, repaymentDueDate: '2023-12-31' }],
    Transactions: [{transactionDate: '2023-01-01', amount: 10000, type: 'repayment', status: 'successful'}],
  }

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
    console.log('Fetching loan list from server...');
    // Example: this.http.get('/api/loans').subscribe(data => { ... });
  }

  /**
   * Clear loan list from session storage (e.g., on logout)
   */
  clearLoanListFromSessionStorage() {
    sessionStorage.removeItem('loanList');
    console.log('Cleared loan list from session storage');
  }

  
}
