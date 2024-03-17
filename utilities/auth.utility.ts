import auth from "@react-native-firebase/auth";
import { SignupDataType } from "../types/auth.types";
import { client } from "../constants/axios.config";
import { UserDataType } from "../types/profile.types";
import { cacheProfileData, deleteCachedAuthData, deleteCachedProfileData } from "./cache.utility";
import { isValidEmail, isValidPhonenumber } from "../helpers/validators.helper";
import { message } from "../helpers/api.helper";

export const validateSignupInputs = (formDetails: SignupDataType): boolean => {
    if (!isValidEmail(formDetails.email)) {
        message("Input a valid email address", "failure");
        return false;
    } else if (!isValidPhonenumber(formDetails.phone)) {
        message("Input a valid phone number", "failure");
        return false;
    } else if (!formDetails.password) {
        message("Input  your password", "failure");
        return false;
    } else if (formDetails.fullName.length < 1) {
        message("Input Your full name", "failure");
        return false;
    } else if (!formDetails.businessName) {
        message("Enter your business name", "failure");
        return false;
    } else if (!formDetails.location) {
        message("Enter your business address", "failure");
        return false;
    } else if (formDetails.accountType !== "VENDOR") {
        return false;
    }
    return true;
};

export const createAccount = async (signupData: SignupDataType): Promise<UserDataType> => {
    try {
        const { email, password, ...userData } = signupData;
        const response: UserDataType = await client.post("/register", { email: email, password: password, ...userData });
        await cacheProfileData(response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const login = async (email: string, password: string): Promise<UserDataType> => {
    try {
        const userCredentials = await auth().signInWithEmailAndPassword(email, password);
        const idToken = await userCredentials.user.getIdToken();
        const response: UserDataType = await client.post("/login", { idToken });
        await cacheProfileData(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await deleteCachedAuthData();
        await deleteCachedProfileData();
    } catch (error) {
        throw error as Error;
    }
};

// signOut();
