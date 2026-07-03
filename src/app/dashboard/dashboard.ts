import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { ApplicationService } from '../services/Application/application-service';
import { Onboarding } from '../services/Onboarding/onboarding';
import { DashboardService } from '../services/Application/dashboard-service';
import { Observable } from 'rxjs';
import { UserDashboardModel } from '../../Models/userDashboardModel';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {

  constructor(private dashboardService: DashboardService,
    private applicationService: ApplicationService,
    private onboarding: Onboarding
  ) { }

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

  userToShow: UserDashboardModel = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    TotalBorowed: 0,
    TotalRepaid: 0,
    TotalOutstanding: 0,
    Loan: [],
    Transactions: [],
    NextRepayment: '',
    RepaymentAmount: 0,
    Rating: ''
  };

  ngOnInit() { 

    //call api to get user details and display on dashboard
    //url para id from route and use it to get user details from api
    this.userToShow = this.getUserDashboardDetails('abcd1234');
  }

  //method to get user details from api and display on dashboard
  getUserDashboardDetails(userId: string): any {
    //call api to get user details and display on dashboard
    return this.UserToReturn;
  }


  //logout method to logout user and redirect to login page
  logout() {
    //call api to logout user and redirect to login page
  }


}
