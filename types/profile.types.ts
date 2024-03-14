export type UserDataType = {
    email: string;
    accountType: "VENDOR" | "USER";
    fullName: string;
    businessName: string;
    location: LocationDataType | null;
    phone: string;
};

export type LocationDataType = {
    long: number;
    lat: number;
    name: string;
};
