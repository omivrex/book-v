import { isValidNumber } from "react-native-phone-number-input";

export const isValidEmail = (email?: string): boolean => {
    if (!email) {
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

export const isValidPhonenumber = (phoneNumber?: string, countryCode?: any): boolean => {
    if (!phoneNumber) {
        return false;
    }
    return isValidNumber(phoneNumber, countryCode || "NG");
};

/**  must have 6 characters and at least one uppercase letter */
export const isValidPassword = (password?: string) => {
    if (!password) {
        return false;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordPattern.test(password);
};
