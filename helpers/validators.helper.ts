import {isValidNumber} from 'react-native-phone-number-input';

export const isValidEmail = (email:string):boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

export const isValidPhonenumber = (phoneNumber:string, countryCode?: any):boolean => {
    return isValidNumber(phoneNumber, countryCode || "NG")
}

export const isValidPassword = (password:string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordPattern.test(password);
}