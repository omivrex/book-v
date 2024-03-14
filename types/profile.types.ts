export type UserDataType = {
    subscription: "BASIC" | "PREMIUM";
    carColor: string;
    carModel: string;
    carName: string;
    email: string;
    fullName: string;
    location: LocationDataType;
    phone: string;
    plateNumber: string;
    averageRating: number;
    profilePhoto: string | undefined;
    accountType: "USER" | "DRIVER";
};

export type LocationDataType = {
    long: number;
    lat: number;
    name: string;
};
