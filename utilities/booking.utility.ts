import { client } from "../constants/axios.config";
import { Availability, Availabilities } from "../types/booking.types";

export const getAllBookedDates = async (): Promise<Availabilities> => {
    try {
        const response: Availabilities = await client.get("/availability");
        return response;
    } catch (error) {
        throw error;
    }
};

export const getavailability = async (date: string): Promise<Availability[]> => {
    try {
        const response: Availability[] = await client.get(`/availability/${date}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createAvailability = async (date: string, availability: Availability): Promise<void> => {
    try {
        await client.post(`/availability`, { date, availability });
    } catch (error) {
        throw error;
    }
};

export const updateAvailability = async (date: string, availability: Availability, index: number) => {
    try {
        await client.put(`/availability/${date}`, { availability }, { params: { index } });
    } catch (error) {
        throw error;
    }
};

export const deleteAvailability = async (date: string, index: number) => {
    try {
        await client.delete(`/availability/delete/${date}`, { params: { availabilityId: index } });
    } catch (error) {
        throw error;
    }
};
