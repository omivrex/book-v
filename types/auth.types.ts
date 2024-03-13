import { LocationDataType } from "./profile.types";

export type SignupDataType = {
    userId: string;
    email: string;
    subscription: "BASIC" | "PREMIUM";
    accountType: "USER" | "DRIVER";
    fullName: string;
    location: LocationDataType;
    phone: string;
    password: string;
};

export type AuthDataType = {
    email: string;
    userId: string;
};
