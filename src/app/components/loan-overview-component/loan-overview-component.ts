import { Component } from '@angular/core';
import { Onboarding } from '../../onboarding';
import { ApplicationService } from '../../services/Application/application-service';
import { DashboardService } from '../../services/Application/dashboard-service';
import { UserDashboardModel } from '../../../Models/userDashboardModel';
import { NgForOf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-overview-component',
  imports: [NgForOf, CommonModule],
  templateUrl: './loan-overview-component.html',
  styleUrl: './loan-overview-component.css',
})
export class LoanOverviewComponent {

  
  constructor(private dashboardService: DashboardService,
    private applicationService: ApplicationService,
    private onboarding: Onboarding
  ) { }

  
  DashboardOverview: UserDashboardModel = {
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
    Rating: '0'
  };

  UserLoans: Loan[] = []
  UserTransactions: Transactions[] = []
  
  ngOnInit() { 
  
    //call api to get user details and display on dashboard
    //url para id from route and use it to get user details from api
    this.DashboardOverview = this.getLoggedInUserFromSessionStorage();
    this.UserTransactions = this.DashboardOverview.Transactions;
    this.UserLoans = this.DashboardOverview.Loan;
    console.log('OverviewPage - userLoggedIn', this.DashboardOverview)
  }
  
  //method to get user details from api and display on dashboard
  getLoggedInUserFromSessionStorage(){
    const item = sessionStorage.getItem('LoggedInUser');
    return item ? JSON.parse(item) : null;
  }

  GetLoanDetailsOverviewForUser(userId: string){
    // request to backend with usrerId

  }

}
