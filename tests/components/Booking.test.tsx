import BookingModal from "../../modals/booking.modal";
import BookingScreen, { AddButn, RenderItem } from "../../screens/main/Bookings.screen";
import { Availability } from "../../types/booking.types";
import { getAllBookedDates, getavailability, deleteAvailability, createAvailability, updateAvailability } from "../../utilities/booking.utility";
import { act, fireEvent, render, waitFor } from "../renderer";

jest.mock("../../utilities/booking.utility", () => ({
    ...jest.requireActual("../../utilities/booking.utility"),
    createAvailability: jest.fn(() => Promise.resolve()),
    updateAvailability: jest.fn(() => Promise.resolve()),
    getAllBookedDates: jest.fn(() => Promise.resolve({})),
    getavailability: jest.fn(() => Promise.resolve([])),
    deleteAvailability: jest.fn((date: string, index: number) => Promise.resolve()),
}));

describe("BookingScreen component", () => {
    test("calls getAllBookedDates on mount", async () => {
        render(<BookingScreen />);
        await act(async () => {});
        expect(getAllBookedDates).toHaveBeenCalled();
    });

    test("calls getavailability when refreshing the FlatList", async () => {
        const { getByTestId } = render(<BookingScreen />);
        await act(async () => {
            fireEvent(getByTestId("rener-list"), "scrollBeginDrag", { nativeEvent: { contentOffset: { y: -100 } } });
        });
        expect(getavailability).toHaveBeenCalled();
    });

    test("calls updateAvailability when save button is clicked for existing availability", async () => {
        const closeFunc = jest.fn();
        const isOpen = true;
        const availabilityData = {
            name: "Test Availability",
            from: new Date().getTime(),
            to: new Date().getTime(),
            description: "Test Description",
        };
        const date = "2024-03-17";
        const index = 1;

        const { getByText } = render(
            <BookingModal closeFunc={closeFunc} isOpen={isOpen} availabilityData={availabilityData as Availability} date={date} index={index} />
        );

        fireEvent.press(getByText("Save"));

        await waitFor(() => {
            expect(updateAvailability).toHaveBeenCalledWith(date, availabilityData, index);
        });

        expect(createAvailability).not.toHaveBeenCalled();
    });

    test("calls createAvailability when save button is clicked for new availability", async () => {
        const closeFunc = jest.fn();
        const isOpen = true;
        const date = "2024-03-17";
        const index = -1;

        const { getByText } = render(<BookingModal closeFunc={closeFunc} isOpen={isOpen} date={date} index={index} />);

        fireEvent.press(getByText("Save"));

        await waitFor(() => {
            expect(createAvailability).toHaveBeenCalledWith(date, expect.any(Object));
        });

        expect(updateAvailability).not.toHaveBeenCalled();
    });

    test("calls deleteAvailability when close button is clicked", () => {
        const { getByTestId } = render(
            <RenderItem selectedDay="string" refreshFunc={jest.fn()} index={1} availabilityData={{ name: "string", description: "string" } as any} />
        );
        fireEvent.press(getByTestId("close-button"));
        expect(deleteAvailability).toHaveBeenCalled();
    });
});
