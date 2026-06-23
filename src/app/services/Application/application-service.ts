import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor() {}

  ngOnInit() {
    // Initialization logic here
  }

  //GetLoanList method to get loan list from api
  GetLoanList(userId: string) {
    //call api to get loan list and display on dashboard
  }

  //GetLoanDetails method to get loan details from api
  GetLoanDetails(loanId: string) {
    //call api to get loan details and display on dashboard
  }

  //ApplyForLoan method to apply for loan from api
  ApplyForLoan(loanRequest: any) {
    //call api to apply for loan and display on dashboard
  }

  //RepayLoan method to repay loan from api
  RepayLoan(loanId: string, amount: number) {
    //call api to repay loan and display on dashboard
  }
}
