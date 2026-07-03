export interface UserDashboardModel {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    TotalBorowed: number;
    TotalRepaid: number;
    TotalOutstanding: number;
    Loan: Loan[];
    Transactions: Transactions[];

    NextRepayment: string;
    RepaymentAmount: number;
    Rating: string;
}