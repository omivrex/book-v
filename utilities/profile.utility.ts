import { client } from "../constants/axios.config";
import { message } from "../helpers/api.helper";
import { isValidEmail, isValidPhonenumber } from "../helpers/validators.helper";
import { UserDataType } from "../types/profile.types";
import { cacheProfileData } from "./cache.utility";

export const validateUpdateData = (formDetails: UserDataType) => {
    if (!isValidEmail(formDetails.email)) {
        message("Input a valid email address", "failure");
        return false;
    } else if (!isValidPhonenumber(formDetails.phone)) {
        message("Input a valid phone number", "failure");
        return false;
    } else if (!formDetails.fullName.length) {
        message("Input Your full name", "failure");
        return false;
    } else if (!formDetails.businessName) {
        message("Enter your business name", "failure");
        return false;
    } else if (!formDetails.location) {
        message("Enter your business address", "failure");
        return false;
    } else {
        return true;
    }
};

export const updateProfileInfo = async (updateData: UserDataType): Promise<UserDataType> => {
    try {
        const response: UserDataType = await client.put("/update", updateData);
        await cacheProfileData(response);
        return response;
    } catch (error) {
        throw error;
    }
};
