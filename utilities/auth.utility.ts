import auth from "@react-native-firebase/auth";
import { SignupDataType } from "../types/auth.types";
import { client } from "../constants/axios.config";
import { UserDataType } from "../types/profile.types";
import { deleteCachedAuthData, deleteCachedProfileData } from "./cache.utility";

export const createAccount = async (signupData: SignupDataType): Promise<UserDataType> => {
    try {
        const { email, password, ...userData } = signupData;
        return await client.post("/api/register", { email: email, password: password, ...userData });
    } catch (error) {
        throw error;
    }
};

export const login = async (email: string, password: string): Promise<UserDataType> => {
    try {
        const userCredentials = await auth().signInWithEmailAndPassword(email, password);
        const idToken = await userCredentials.user.getIdToken();
        return await client.post("/api/login", { idToken });
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
