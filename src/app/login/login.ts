import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import {LoginCommand} from "../../Models/onboarding/LoginCommand";
import { FormsModule } from '@angular/forms';
import {Onboarding} from "../services/Onboarding/onboarding";
import { RegisterCommand } from '../../Models/onboarding/RegisterCommand';
import { UserDashboardModel } from '../../Models/userDashboardModel';
import { Roles } from '../../Models/Roles';
import { email } from '@angular/forms/signals';

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

  loginFailed: boolean = false;

  OnSubmit(): void {
    //Do Login

    const usersList: UserDashboardModel[] = this.onboardingService.getValidRegisteredUsers();
    const loggedInUser = usersList.find(e => e.email === this.Login.email);

    if (loggedInUser && loggedInUser.Password === this.Login.password) {
      this.loginFailed = false;
      console.log('the logged in user from storage', loggedInUser)
      this.saveUserToSessionStorage(loggedInUser)
      this.router.navigate([`dashboard/${loggedInUser.userId}`]);
      return;
    }

    this.loginFailed = true;
  }

  
  /**
   * Save User to session storage
   */
  saveUserToSessionStorage(itemToSave: any) {
    sessionStorage.setItem('LoggedInUser', JSON.stringify(itemToSave));
  }

  /**
   * a test helper function
   */
  GetUserFromServer() : UserDashboardModel{
    return {
      userId: '1',
      firstName: 'Adeola',
      lastName: 'Okonkwo',
      email: 'AOkonkwo@gmail.com',
      phoneNumber: '08012345678',
      Role: Roles.Loanee,
      Password: 'admin654321!',
      RegisteredAt: Date.now(),
      StateOfResidence: 'Lagos',
      TotalBorowed: 100000,
      TotalRepaid: 50000,
      TotalOutstanding: 50000,
      Loan: [{ LoanId: 'loan1', Amount: 100000, Status: 'active', RepaymentSchedule: 'monthly', RepaymentAmount: 10000, RepaymentDueDate: '2023-12-31', LoanType: 'Personal Loan', DisbursedDate: '2023-12-31' }],
      Transactions: [{TransactionDate: '2023-01-01', Amount: 10000, Description: 'repayment', Status: 'successful', LoanId: '1', LoanType: 'Personal Loan'}],
      FundedLoans: [],
      NextRepayment: '',
      RepaymentAmount: 0,
      Rating: '0'
    }

  }

}
