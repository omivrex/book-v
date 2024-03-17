import { LocationDataType } from "./profile.types";

export type SignupDataType = {
    email: string;
    accountType: "VENDOR";
    fullName: string;
    location: LocationDataType | null;
    phone: string;
    businessName: string;
    password: string;
};

export type AuthDataType = {
    accessToken: string;
};
