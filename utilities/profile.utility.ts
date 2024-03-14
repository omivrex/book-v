import { client } from "../constants/axios.config";
import { UserDataType } from "../types/profile.types";
import { cacheProfileData } from "./cache.utility";

export const updateProfileInfo = async (updateData: UserDataType): Promise<UserDataType> => {
    try {
        const response: UserDataType = await client.put("/update", updateData);
        await cacheProfileData(response);
        return response;
    } catch (error) {
        throw error;
    }
};
