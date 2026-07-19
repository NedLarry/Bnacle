import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-repayment-component',
  imports: [CommonModule, FormsModule, RouterLink],
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

  paymentType: 'full' | 'custom' = 'full';
  customAmount: number | null = null;
  showSuccessModal: boolean = false;
  paidAmount: number = 0;
  transactionRef: string = '';

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
    this.paymentType = 'full';
    this.customAmount = null;
  }

  setPaymentType(type: 'full' | 'custom') {
    this.paymentType = type;
  }

  get totalDebit(): number {
    if (this.paymentType === 'custom') {
      return this.customAmount ?? 0;
    }
    return this.selectedLoan?.RepaymentAmount ?? 0;
  }

  confirmPayment() {
    this.paidAmount = this.totalDebit;
    this.transactionRef = Math.floor(Date.now() / 1000).toString().slice(-8).toUpperCase();
    this.showSuccessModal = true;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  /**
   * Get all loans due for repayment for the logged-in user
   */
  getLoansForRepayment() {
    this.isLoading = true;
    this.error = null;

    // Demo branch: mocked by reading the logged-in user's own loans
    // instead of a live API call.
    const loggedInUser = this.getLoggedInUserFromSessionStorage();
    this.allLoans = this.filterLoansDueForRepayment(loggedInUser?.Loan ?? []);
    this.isLoading = false;
  }

  getLoggedInUserFromSessionStorage() {
    const item = sessionStorage.getItem('LoggedInUser');
    return item ? JSON.parse(item) : null;
  }

  /**
   * Filter loans that are due for repayment
   * A loan is due if the repayment date has passed or is today
   */
  filterLoansDueForRepayment(loans: any[]): any[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only

    return loans.filter((loan) => {
      const dueDate = new Date(loan.RepaymentDueDate);
      dueDate.setHours(0, 0, 0, 0); // Reset time to compare dates only

      // Check if loan is due (repayment date has passed or is today)
      return dueDate <= today && loan.Status !== 'completed' && loan.Status !== 'closed';
    });
  }
}
