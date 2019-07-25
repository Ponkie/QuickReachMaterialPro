export interface IUser {
    name: string;
    password: string;
    emailAddress: string;
    mobileNumber: string;
    imageUrl: string;
    isActive: boolean;
    action?: string;
    type?: string;
}