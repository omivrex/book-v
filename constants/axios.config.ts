import axios, { Axios, AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthDataType } from "../types/auth.types";
import { message } from "../helpers/api.helper";

export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

let authData: AuthDataType | undefined;

client.interceptors.request.use(
    (request) => {
        request.headers.Authorization = authData ? `Bearer ${authData.accessToken}` : "";
        return request;
    },
    (error: AxiosError) => {
        if (error.status) {
            error.status >= 500 ? message("Something went wrong", "failure") : message(error.message, "failure");
        }
        console.warn("Error fetching request =>", error.request.url, error.status);
        return Promise.reject(error);
    }
);

export const cacheAuthData = async (data: AuthDataType) => {
    try {
        const jsonData = JSON.stringify(data);
        await SecureStore.setItemAsync("auth-data", jsonData);
    } catch (error) {
        throw error as Error;
    }
};

export const getCachedAuthData = async (): Promise<void> => {
    try {
        const response = await SecureStore.getItemAsync("auth-data");
        if (response) {
            authData = JSON.parse(response);
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
