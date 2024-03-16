import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { AuthDataType } from "../types/auth.types";
import { message } from "../helpers/api.helper";
import { cacheAuthData, getCachedAuthData } from "../utilities/cache.utility";

export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

let authData: AuthDataType | undefined;
const fetchAuthData = () => {
    getCachedAuthData()
        .then((data) => (authData = data))
        .catch((err) => err);
};

fetchAuthData();

client.interceptors.request.use(
    async (request) => {
        request.headers.Authorization = authData ? `Bearer ${authData.accessToken}` : "";
        return request;
    },
    (error: AxiosError) => {
        console.warn("Error fetching request =>", error.request.url, error.message);
        return Promise.reject(error);
    }
);

interface responseDataType {
    message: string;
    accessToken?: string;
    data?: any;
}

client.interceptors.response.use(
    (response: AxiosResponse<responseDataType>) => {
        if (response.data.accessToken) cacheAuthData({ accessToken: response.data.accessToken }).then(fetchAuthData);
        return response.data.data;
    },
    (error: AxiosError) => {
        if (error.response) {
            error.response.status >= 500 ? message("Something went wrong", "failure") : message((error.response.data as responseDataType).message, "failure");
        }
        console.warn("Error fetching request =>", error.request.url, error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);
