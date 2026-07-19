import { Component } from '@angular/core';
import { Onboarding } from '../../onboarding';
import { ApplicationService } from '../../services/Application/application-service';
import { DashboardService } from '../../services/Application/dashboard-service';
import { UserDashboardModel } from '../../../Models/userDashboardModel';
import { FundedLoan } from '../../../Models/fundedLoan';
import { Roles } from '../../../Models/Roles';
import { NgForOf, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loan-overview-component',
  imports: [NgForOf, CommonModule, RouterLink],
  templateUrl: './loan-overview-component.html',
  styleUrl: './loan-overview-component.css',
})
export class LoanOverviewComponent {


  constructor(private dashboardService: DashboardService,
    private applicationService: ApplicationService,
    private onboarding: Onboarding
  ) { }

  Roles = Roles;

  DashboardOverview: UserDashboardModel = {
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
    Rating: '0'
  };

  UserLoans: Loan[] = []
  UserTransactions: Transactions[] = []
  FundedLoans: FundedLoan[] = []

  TotalDisbursed: number = 0;
  OutstandingToCollect: number = 0;
  WalletBalance: number = 250000; // mock treasury balance for demo purposes

  ngOnInit() {

    //call api to get user details and display on dashboard
    //url para id from route and use it to get user details from api
    this.DashboardOverview = this.getLoggedInUserFromSessionStorage();
    this.UserTransactions = this.DashboardOverview.Transactions;
    this.UserLoans = this.DashboardOverview.Loan;
    this.FundedLoans = this.DashboardOverview.FundedLoans ?? [];
    this.TotalDisbursed = this.FundedLoans.reduce((sum, loan) => sum + loan.Amount, 0);
    this.OutstandingToCollect = this.FundedLoans
      .filter((loan) => loan.Status !== 'repaid')
      .reduce((sum, loan) => sum + loan.Amount, 0);
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
