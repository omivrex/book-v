import BookingModal from "../../modals/booking.modal";
import BookingScreen, { AddButn, RenderItem } from "../../screens/main/Bookings.screen";
import { getAllBookedDates, getavailability, deleteAvailability } from "../../utilities/booking.utility";
import { act, fireEvent, render } from "../renderer";

jest.mock("../../utilities/booking.utility", () => ({
    ...jest.requireActual("../../utilities/booking.utility"),
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

    test("opens BookingModal when add button is clicked", async () => {
        const { getByTestId } = render(<AddButn {...({} as any)} />);
        await act(async () => {
            fireEvent.press(getByTestId("add-button"));
            const bookingModal = getByTestId("booking-modal");
            expect(bookingModal.props.children.props.isOpen).toBeTruthy();
        });
    });

    //write test to validate that thew update function is called when the button on the modal is clicked but for create and update

    test("calls deleteAvailability when close button is clicked", () => {
        const { getByTestId } = render(
            <RenderItem selectedDay="string" refreshFunc={jest.fn()} index={1} availabilityData={{ name: "string", description: "string" } as any} />
        );
        fireEvent.press(getByTestId("close-button"));
        expect(deleteAvailability).toHaveBeenCalled();
    });
});
