export interface LoanRequestCommand {
    Amount: number;
    RepaymentDate: number;
    LoanPurpose: string;
    RepaymentAmount: number;
    LoanType: string
}