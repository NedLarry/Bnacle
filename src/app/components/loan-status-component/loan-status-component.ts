import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-status-component',
  imports: [CommonModule, NgForOf],
  templateUrl: './loan-status-component.html',
  styleUrl: './loan-status-component.css',
})
export class LoanStatusComponent implements OnInit {
  loans: Loan[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  selectedLoan: Loan | null = null;

  constructor() {}

  ngOnInit() {
    this.requestLoansFromServer();
  }

  /**
   * Handle loan selection when a loan banner is clicked
   */
  selectLoan(loan: Loan) {
    this.selectedLoan = loan;
  }

  /**
   * Request loans from server
   */
  requestLoansFromServer() {
    this.isLoading = true;
    this.error = null;

    // Demo branch: mocked by reading the logged-in user's own loans
    // instead of a live API call.
    const loggedInUser = this.getLoggedInUserFromSessionStorage();
    this.loans = loggedInUser?.Loan ?? [];
    this.isLoading = false;
  }

  getLoggedInUserFromSessionStorage() {
    const item = sessionStorage.getItem('LoggedInUser');
    return item ? JSON.parse(item) : null;
  }
}
