export const Roles = {
    Loanee: 'Loanee',
    Loaner: 'Loaner',
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export const AllRoles: Role[] = [Roles.Loanee, Roles.Loaner];
