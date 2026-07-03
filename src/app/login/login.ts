import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import {LoginCommand} from "../../Models/onboarding/LoginCommand";
import { FormsModule } from '@angular/forms';
import {Onboarding} from "../services/Onboarding/onboarding";
import { RegisterCommand } from '../../Models/onboarding/RegisterCommand';
import { UserDashboardModel } from '../../Models/userDashboardModel';
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

  OnSubmit(): void {
    //Do Login
    
    const usersList:[UserDashboardModel] = this.getUserFromSessionStorage('users');

    if (this.Login.password == "admin654321!"){

      const loggedInUser = usersList.find(e=> e["email"] == this.Login.email)
      console.log('the logged in user from storage', loggedInUser)
      this.saveUserToSessionStorage(loggedInUser)
      this.router.navigate([`dashboard/${loggedInUser?.userId}`]);

      return;

    }

    return;
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
      TotalBorowed: 100000,
      TotalRepaid: 50000,
      TotalOutstanding: 50000,
      Loan: [{ LoanId: 'loan1', Amount: 100000, Status: 'active', RepaymentSchedule: 'monthly', RepaymentAmount: 10000, RepaymentDueDate: '2023-12-31', LoanType: 'Personal Loan', DisbursedDate: '2023-12-31' }],
      Transactions: [{TransactionDate: '2023-01-01', Amount: 10000, Description: 'repayment', Status: 'successful', LoanId: '1', LoanType: 'Personal Loan'}],
      NextRepayment: '',
      RepaymentAmount: 0,
      Rating: '0'
    }
     
  }

  /**
   * Retrieve users list from session storage
   * a helper function to be updated
   */
  getUserFromSessionStorage(itemName:string){
    const item = sessionStorage.getItem(itemName);
    return item ? JSON.parse(item) : null;
  }

}
