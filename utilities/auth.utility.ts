import auth from "@react-native-firebase/auth";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "react-native-storage";

import { UserCollection } from "../constants/firebase.constant";
import { AuthDataType, SignupDataType } from "../types/auth.types";

export const userStorage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    enableCache: true,
});

export const createAccount = async (email: string, password: string): Promise<AuthDataType> => {
    try {
        const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
        const authData = { userId: userCredentials.user.uid, email: userCredentials.user.email || email };
        await cacheAuthData(authData);
        return authData;
    } catch (error) {
        throw error as Error;
    }
};

export const login = async (email: string, password: string): Promise<AuthDataType> => {
    try {
        const userCredentials = await auth().signInWithEmailAndPassword(email, password);
        const authData = { userId: userCredentials.user.uid, email: userCredentials.user.email || email };
        await cacheAuthData(authData);
        return authData;
    } catch (error) {
        throw error as Error;
    }
};

export const createDriverRecordInDB = async (driverDetails: Omit<SignupDataType, "password">, userId: string): Promise<void> => {
    driverDetails.accountType = "DRIVER";
    await UserCollection.doc(userId).set(driverDetails);
};

const cacheAuthData = async (data: AuthDataType) => {
    try {
        const jsonData = JSON.stringify(data);
        await SecureStore.setItemAsync("auth-data", jsonData);
    } catch (error) {
        throw error as Error;
    }
};

export const getCachedAuthData = async (): Promise<AuthDataType | undefined> => {
    try {
        const authData = await SecureStore.getItemAsync("auth-data");
        if (authData) {
            return JSON.parse(authData);
        } else {
            throw new Error("Cannot find user auth data");
        }
    } catch (error: any) {
        throw new Error(error.message, { cause: "auth-error" });
    }
};

export const signOutFromFirebase = async () => {
    try {
        await auth().signOut();
        await SecureStore.deleteItemAsync("auth-data");
        await userStorage.remove({ key: "profile-data" });
    } catch (error) {
        throw error as Error;
    }
};

// signOutFromFirebase();
// SecureStore.deleteItemAsync("auth-data");
// userStorage.remove({ key: "profile-data" });
