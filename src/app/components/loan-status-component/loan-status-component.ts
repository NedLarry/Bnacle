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

    console.log('Fetching loan status from server...');

    // TODO: Replace with actual API call
    // Example:
    // this.http.get('/api/loans').subscribe(
    //   (response: any) => {
    //     this.loans = response;
    //     this.isLoading = false;
    //     console.log('Loans fetched successfully:', this.loans);
    //   },
    //   (error) => {
    //     this.error = 'Failed to fetch loan status';
    //     this.isLoading = false;
    //     console.error('Error fetching loans:', error);
    //   }
    // );

    // Placeholder: Mock data
    this.mockFetchLoans();
  }

  /**
   * Mock fetch loans (remove when real API is implemented)
   */
  private mockFetchLoans() {
    this.loans = [

      {

        LoanId: "1",
        Status: 'active',
        Amount: 50000,
        RepaymentAmount: 65000,
        RepaymentDueDate: '07-07-2024',
        LoanType: 'Personal Loan',
        DisbursedDate: '01-01-2024',
        RepaymentSchedule: 'Monthly',
      },
      {
        LoanId: "2",
        Status: 'pending',
        Amount: 100000,
        RepaymentAmount: 125000,
        RepaymentDueDate: '12-12-2031',
        LoanType: 'Business Loan',
        DisbursedDate: '01-01-2024',
        RepaymentSchedule: 'Monthly',
      }
    ];
  }

  getLoanListFromSessionStorage() {
    const cachedLoanList = sessionStorage.getItem('loanList');
    return cachedLoanList ? JSON.parse(cachedLoanList) : null;
  }
}
