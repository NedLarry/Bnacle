import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-list-component',
  imports: [NgForOf],
  templateUrl: './loan-list-component.html',
  styleUrl: './loan-list-component.css',
})
export class LoanListComponent implements OnInit {

  constructor (){}

  ngOnInit() {
    this.loadLoanList();
  }


  LoanList = [];

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
