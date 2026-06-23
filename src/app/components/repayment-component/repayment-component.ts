import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repayment-component',
  imports: [],
  templateUrl: './repayment-component.html',
  styleUrl: './repayment-component.css',
})
export class RepaymentComponent implements OnInit {
  loansDueForRepayment: any[] = [];
  allLoans: any[] = [];
  userId: string = '1'; // Get from auth service or route params
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {}

  ngOnInit() {
    this.getLoansForRepayment();
  }

  /**
   * Get all loans due for repayment for a user
   */
  getLoansForRepayment() {
    this.isLoading = true;
    this.error = null;

    console.log(`Fetching loans due for repayment for user: ${this.userId}`);

    // TODO: Replace with actual API call
    // Example:
    // this.http.get(`/api/loans/user/${this.userId}`).subscribe(
    //   (response: any) => {
    //     this.allLoans = response;
    //     this.loansDueForRepayment = this.filterLoansDueForRepayment(this.allLoans);
    //     this.isLoading = false;
    //     console.log('Loans due for repayment:', this.loansDueForRepayment);
    //   },
    //   (error) => {
    //     this.error = 'Failed to fetch loans for repayment';
    //     this.isLoading = false;
    //     console.error('Error fetching loans:', error);
    //   }
    // );

    // Placeholder: Mock data
    this.mockFetchLoansForRepayment();
  }

  /**
   * Filter loans that are due for repayment
   * A loan is due if the repayment date has passed or is today
   */
  filterLoansDueForRepayment(loans: any[]): any[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only

    return loans.filter((loan) => {
      let dueDate: Date;

      // Handle different date formats
      if (typeof loan.repaymentDate === 'string') {
        // Try parsing 'DD-MM-YYYY' format
        const [day, month, year] = loan.repaymentDate.split('-');
        dueDate = new Date(`${year}-${month}-${day}`);
      } else if (typeof loan.repaymentDate === 'number') {
        dueDate = new Date(loan.repaymentDate);
      } else {
        dueDate = new Date(loan.repaymentDate);
      }

      dueDate.setHours(0, 0, 0, 0); // Reset time to compare dates only

      // Check if loan is due (repayment date has passed or is today)
      return dueDate <= today && loan.status !== 'completed' && loan.status !== 'closed';
    });
  }

  /**
   * Mock fetch loans for repayment (remove when real API is implemented)
   */
  private mockFetchLoansForRepayment() {
    setTimeout(() => {
      this.allLoans = [
        {
          loanId: 1,
          status: 'active',
          amount: 50000,
          repaymentAmount: 65000,
          repaymentDate: '06-20-2026', // Due (past date)
          loanPurpose: 'Business expansion',
          outstandingAmount: 15000
        },
        {
          loanId: 2,
          status: 'active',
          amount: 100000,
          repaymentAmount: 125000,
          repaymentDate: '12-31-2030', // Not due (future date)
          loanPurpose: 'Property purchase',
          outstandingAmount: 25000
        },
        {
          loanId: 3,
          status: 'active',
          amount: 75000,
          repaymentAmount: 90000,
          repaymentDate: '06-23-2026', // Due (today)
          loanPurpose: 'Education',
          outstandingAmount: 15000
        },
        {
          loanId: 4,
          status: 'completed',
          amount: 50000,
          repaymentAmount: 60000,
          repaymentDate: '06-01-2026', // Due but completed
          loanPurpose: 'Car purchase',
          outstandingAmount: 0
        }
      ];

      this.loansDueForRepayment = this.filterLoansDueForRepayment(this.allLoans);
      this.isLoading = false;
      console.log('Loans due for repayment:', this.loansDueForRepayment);
    }, 1000);
  }
}
