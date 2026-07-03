import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repayment-component',
  imports: [CommonModule],
  templateUrl: './repayment-component.html',
  styleUrl: './repayment-component.css',
})
export class RepaymentComponent implements OnInit {

  allLoans: Loan[] = [];
  userId: string = '1'; // Get from auth service or route params
  isLoading: boolean = false;
  error: string | null = null;
  selectedLoan: Loan | null = null;
  showPaymentForm: boolean = false;

  constructor() {}

  ngOnInit() {
    this.getLoansForRepayment();
  }

  /**
   * Handle loan selection when a loan panel is clicked
   */
  selectLoan(loan: Loan) {
    this.selectedLoan = loan;
    this.showPaymentForm = true;
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
    this.allLoans = [
        {
          LoanId: "1",
          Status: 'active',
          Amount: 50000,
          RepaymentAmount: 65000,
          RepaymentDueDate: '06-20-2026', // Due (past date)
          LoanType: 'Business-Loan',
          DisbursedDate: '06-20-2026',
          RepaymentSchedule: '12 months'

        },
        {
          LoanId: "1",
          Status: 'active',
          Amount: 20000,
          RepaymentAmount: 23000,
          RepaymentDueDate: '06-20-2026', // Due (past date)
          LoanType: 'Business-Loan',
          DisbursedDate: '06-20-2026',
          RepaymentSchedule: '12 months'
        },
        {
          LoanId: "1",
          Status: 'active',
          Amount: 10000,
          RepaymentAmount: 15000,
          RepaymentDueDate: '06-20-2026', // Due (past date)
          LoanType: 'Business-Loan',
          DisbursedDate: '06-20-2026',
          RepaymentSchedule: '12 months'
        },
        {
          LoanId: "1",
          Status: 'active',
          Amount: 1000,
          RepaymentAmount: 2500,
          RepaymentDueDate: '06-20-2026', // Due (past date)
          LoanType: 'Business-Loan',
          DisbursedDate: '06-20-2026',
          RepaymentSchedule: '12 months'
        }
      ];
  }
}
