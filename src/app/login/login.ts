import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import {LoginCommand} from "../../Models/onboarding/LoginCommand";
import { FormsModule } from '@angular/forms';
import {Onboarding} from "../services/Onboarding/onboarding";
import { UserDashboardModel } from '../../Models/userDashboardModel';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private onboardingService: Onboarding, private router: Router) {}

  Login: LoginCommand = {
    email: '',
    password: ''
  }

  OnSubmit(): void {
    //Do Login
    if (this.Login.email == "admin@Impravia.com" && this.Login.password == "admin654321!")
      this.router.navigate([`dashboard/${this.UserToReturn.userId}`]);
    return;
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
  

}
