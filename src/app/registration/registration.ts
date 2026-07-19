import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Onboarding } from '../services/Onboarding/onboarding';
import { RegisterCommand } from '../../Models/onboarding/RegisterCommand';
import { UserDashboardModel } from '../../Models/userDashboardModel';
import { Roles } from '../../Models/Roles';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  constructor (private onboardingService: Onboarding, private router: Router){}

  Roles = Roles;

  registerUserBody : RegisterCommand = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    PhoneNumber: '',
    StateOfResidence: '',
    EmploymentStatus: '',
    Role: ''
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
      userId: Date.now().toString(),
      Role: this.registerUserBody.Role,
      Password: this.registerUserBody.Password,
      RegisteredAt: Date.now(),
      StateOfResidence: this.registerUserBody.StateOfResidence,
      TotalBorowed: 0,
      TotalRepaid: 0,
      TotalOutstanding: 0,
      Loan: [],
      Transactions: [],
      FundedLoans: [],
      NextRepayment: '',
      RepaymentAmount: 0,
      Rating: '0'
    }

    this.onboardingService.registerUser(newUser);
    console.log('user object for creation', newUser)
    return true;
  }
}
