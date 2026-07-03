import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Onboarding } from '../services/Onboarding/onboarding';
import { RegisterCommand } from '../../Models/onboarding/RegisterCommand';
import { UserDashboardModel } from '../../Models/userDashboardModel';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  constructor (private onboardingService: Onboarding, private router: Router){}

  registerUserBody : RegisterCommand = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    PhoneNumber: '',
    StateOfResidence: '',
    EmploymentStatus: ''
  }

  RegisterUser(){

    if(this.SaveUserToServer()){
      this.router.navigate([``]);
    }
  }

  SaveUserToServer(): boolean {

    const newUser : UserDashboardModel = {
      firstName: this.registerUserBody.FirstName,
      lastName: this.registerUserBody.LastName,
      email: this.registerUserBody.Email,
      phoneNumber: this.registerUserBody.PhoneNumber,
      userId: Date.now.toString()[3],
      TotalBorowed: 0,
      TotalRepaid: 0,
      TotalOutstanding: 0,
      Loan: [],
      Transactions: [],
      NextRepayment: '',
      RepaymentAmount: 0,
      Rating: '0'
    }
    sessionStorage.setItem('users', JSON.stringify([newUser]))
    console.log('user object for creation', newUser)
    return true;
  }
}
