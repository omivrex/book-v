import { client } from "../constants/axios.config";
import { Notification } from "../types/notification.types";

export const getNotifications = async (): Promise<Notification[]> => {
    try {
        const response: Notification[] = await client.get(`/notifications`);
        return response;
    } catch (error) {
        throw error;
    }
};
