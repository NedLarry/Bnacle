import { Routes } from '@angular/router';
import {Login} from './login/login';
import {Registration} from './registration/registration';
import {VerifyEmail} from './verify-email/verify-email';
import {ForgotPassword} from './forgot-password/forgot-password';
import {Dashboard} from './dashboard/dashboard';
import {LoanListComponent} from './components/loan-list-component/loan-list-component';
import {LoanApplyComponent} from './components/loan-apply-component/loan-apply-component';
import {LoanOverviewComponent} from './components/loan-overview-component/loan-overview-component';
import { UserProfileComponent } from './components/user-profile-component/user-profile-component';
import { RepaymentComponent } from './components/repayment-component/repayment-component';
import { LoanStatusComponent } from './components/loan-status-component/loan-status-component';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Registration },
  { path: 'verify-email', component: VerifyEmail },
  { path: 'forgot-password', component: ForgotPassword },
  { 
    path: 'dashboard/:id', 
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'loan-overview', pathMatch: 'full' },
      { path: 'loan-overview', component: LoanOverviewComponent },
      { path: 'loan-list', component: LoanListComponent },
      { path: 'loan-apply', component: LoanApplyComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'loan-repayment', component: RepaymentComponent },
      { path: 'loan-status', component: LoanStatusComponent },
    ]
  }
];


