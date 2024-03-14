import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "react-native-storage";
import { UserDataType } from "../types/profile.types";
import * as SecureStore from "expo-secure-store";
import { AuthDataType } from "../types/auth.types";

export const userStorage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    enableCache: true,
});
export const cacheAuthData = async (data: AuthDataType) => {
    try {
        const jsonData = JSON.stringify(data);
        await SecureStore.setItemAsync("auth-data", jsonData);
    } catch (error) {
        throw error as Error;
    }
};

export const getCachedAuthData = async (): Promise<AuthDataType> => {
    try {
        const response = await SecureStore.getItemAsync("auth-data");
        if (response) {
            return JSON.parse(response);
        } else {
            throw new Error("Cannot find user auth data");
        }
    } catch (error: any) {
        throw new Error(error.message, { cause: "auth-error" });
    }
};

export const deleteCachedAuthData = async () => {
    try {
        await SecureStore.deleteItemAsync("auth-data");
    } catch (error: any) {
        throw new Error(error.message, { cause: "auth-error" });
    }
};

export const cacheProfileData = async (data: UserDataType): Promise<void> => {
    await userStorage.save({ key: "profile-data", data });
};

export const deleteCachedProfileData = async () => {
    try {
        await userStorage.remove({ key: "profile-data" });
    } catch (error: any) {
        throw error;
    }
};
