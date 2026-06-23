import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-status-component',
  imports: [],
  templateUrl: './loan-status-component.html',
  styleUrl: './loan-status-component.css',
})
export class LoanStatusComponent implements OnInit {
  loans: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {}

  ngOnInit() {
    this.requestLoansFromServer();
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
    setTimeout(() => {
      this.loans = [
        {
          loanId: 1,
          status: 'active',
          amount: 50000,
          repaymentAmount: 65000,
          repaymentDate: '07-07-2030',
          loanPurpose: 'For test request'
        },
        {
          loanId: 2,
          status: 'pending',
          amount: 100000,
          repaymentAmount: 125000,
          repaymentDate: '12-12-2031',
          loanPurpose: 'Business expansion'
        }
      ];
      this.isLoading = false;
      console.log('Mock loans loaded:', this.loans);
    }, 1000);
  }
}
