import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { LoanRequestCommand } from '../../../Models/LoanRequestCommand';
import { Router, RouterLink, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-apply-component',
  imports: [FormsModule, RouterModule],
  templateUrl: './loan-apply-component.html',
  styleUrl: './loan-apply-component.css',
})
export class LoanApplyComponent {
  constructor(private router:Router, private route: ActivatedRoute) {}

  ngOnInit() {
    //request to check if user can make request
  }

  loanApplicationRequest : LoanRequestCommand = {
    LoanType: "ranged",
    Amount: 0,
    RepaymentAmount: 0,
    RepaymentDate: Date.now(),
    LoanPurpose: ""
  }

  proposedInterest = 
  ((this.loanApplicationRequest.Amount + this.loanApplicationRequest.RepaymentAmount)/this.loanApplicationRequest.Amount) || 0

  LoanList = [
    {
      loanId: 1,
      Amount: 50000,
      RepaymentAmount: 65000,
      RepaymentDate: '07-07-2030',
      LoanPurpose: "For test for request"
    
    }
  ];

  /**
   * Save loan list to session storage
   */
  saveLoanListToSessionStorage(loanList: any[]) {
    sessionStorage.setItem('loanList', JSON.stringify(loanList));
  }

  /**
   * Retrieve loan list from session storage
   */
  getLoanListFromSessionStorage() {
    const cachedLoanList = sessionStorage.getItem('loanList');
    return cachedLoanList ? JSON.parse(cachedLoanList) : this.LoanList;
  }

  /**
   * Submit loan request with session storage and network persistence
   */
  SubmitLoanRequest(event: Event){
    // Prevent default form submission and page reload
    event.preventDefault();

    if(this.LoanList.length >= 6){
      this.router.navigate(['../loan-list'], { relativeTo: this.route });
    }

    // Get existing loans from session storage
    const existingLoans = this.getLoanListFromSessionStorage();

    // Create new loan request
    const newLoan = {
      loanId: existingLoans.length + 1,
      Amount: this.loanApplicationRequest.Amount,
      RepaymentAmount: this.loanApplicationRequest.RepaymentAmount,
      RepaymentDate: this.loanApplicationRequest.RepaymentDate,
      LoanPurpose: this.loanApplicationRequest.LoanPurpose
    };

    // Add new request to the list
    existingLoans.push(newLoan);

    // Persist to session storage
    this.saveLoanListToSessionStorage(existingLoans);
    this.LoanList = existingLoans;

    console.log('Loan saved to session storage:', newLoan);

    // Call network API to persist the request to backend
    this.submitLoanRequestToServer(this.loanApplicationRequest);

    // Programmatically redirect to loan list without page reload
    this.router.navigate(['../loan-list'], { relativeTo: this.route });
  }

  /**
   * Submit loan request to server (network call)
   */
  submitLoanRequestToServer(request: LoanRequestCommand) {
    console.log('Submitting loan request to server:', request);
    // TODO: Replace with actual API call
    // Example: this.http.post('/api/loans', request).subscribe(
    //   (response) => {
    //     console.log('Loan request submitted successfully:', response);
    //   },
    //   (error) => {
    //     console.error('Error submitting loan request:', error);
    //   }
    // );
  }

  CanUserApply(userId:string){
    
  }
}
