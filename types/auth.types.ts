import { LocationDataType } from "./profile.types";

export type SignupDataType = {
    email: string;
    accountType: "VENDOR" | "USER";
    fullName: string;
    location: LocationDataType | null;
    phone: string;
    businessName: string;
    password: string;
};

export type AuthDataType = {
    accessToken: string;
};
