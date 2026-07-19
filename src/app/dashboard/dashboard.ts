import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { ApplicationService } from '../services/Application/application-service';
import { Onboarding } from '../services/Onboarding/onboarding';
import { DashboardService } from '../services/Application/dashboard-service';
import { Observable } from 'rxjs';
import { UserDashboardModel } from '../../Models/userDashboardModel';
import { Roles } from '../../Models/Roles';

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

  Roles = Roles;

  userToShow: UserDashboardModel = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    Role: '',
    Password: '',
    RegisteredAt: 0,
    StateOfResidence: '',
    TotalBorowed: 0,
    TotalRepaid: 0,
    TotalOutstanding: 0,
    Loan: [],
    Transactions: [],
    FundedLoans: [],
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
    // Demo branch: mocked by reading the logged-in user cached at login time
    // instead of a live API call.
    return this.getLoggedInUserFromSessionStorage() ?? this.userToShow;
  }

  getLoggedInUserFromSessionStorage() {
    const item = sessionStorage.getItem('LoggedInUser');
    return item ? JSON.parse(item) : null;
  }


  //logout method to logout user and redirect to login page
  logout() {
    //call api to logout user and redirect to login page
  }


}
