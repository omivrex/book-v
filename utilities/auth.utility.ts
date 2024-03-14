import auth from "@react-native-firebase/auth";
import { SignupDataType } from "../types/auth.types";
import { client } from "../constants/axios.config";
import { UserDataType } from "../types/profile.types";
import { cacheProfileData, deleteCachedAuthData, deleteCachedProfileData } from "./cache.utility";

export const createAccount = async (signupData: SignupDataType): Promise<UserDataType> => {
    try {
        const { email, password, ...userData } = signupData;
        const response: UserDataType = await client.post("/api/register", { email: email, password: password, ...userData });
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
        const response: UserDataType = await client.post("/api/login", { idToken });
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
