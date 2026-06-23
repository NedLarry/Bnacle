export interface UserDashboardModel {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    TotalBorowed: number;
    TotalRepaid: number;
    TotalOutstanding: number;
    Loan: Array<{
        loanId: string;
        amount: number;
        status: string;
        repaymentSchedule: string;
        repaymentAmount: number;
        repaymentDueDate: string;
    }>;
    Transactions: Array<{
        transactionDate: string;
        amount: number;
        type: string;
        status: string;
    }>;
}