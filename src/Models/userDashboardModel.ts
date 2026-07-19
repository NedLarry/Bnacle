import { FundedLoan } from './fundedLoan';

export interface UserDashboardModel {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    Role: string;
    Password: string;
    RegisteredAt: number;
    StateOfResidence: string;
    TotalBorowed: number;
    TotalRepaid: number;
    TotalOutstanding: number;
    Loan: Loan[];
    Transactions: Transactions[];
    FundedLoans: FundedLoan[];

    NextRepayment: string;
    RepaymentAmount: number;
    Rating: string;
}