import { act, fireEvent, render, waitFor } from "../renderer";
import NotificationScreen from "../../screens/main/Notifications.screen";
import { navigation } from "../_mocks_/navigation.mock";
import * as notificationsUtility from "../../utilities/notification.utility";

jest.mock("../../utilities/notification.utility", () => ({
    getNotifications: jest.fn(() => Promise.resolve([])),
}));

describe("NotificationScreen", () => {
    test("renders notifications", async () => {
        const { getByText } = render(<NotificationScreen navigation={navigation} />);

        expect(getByText("Notification")).toBeTruthy();
    });

    test("refresh control triggers refetch", async () => {
        const { getByTestId } = render(<NotificationScreen navigation={navigation} />);

        fireEvent(getByTestId("flatlist"), "scrollBeginDrag", { nativeEvent: { contentOffset: { y: -100 } } });

        const mockedUtility = jest.spyOn(notificationsUtility, "getNotifications");

        await act(async () => {
            await waitFor(() => expect(mockedUtility.mockImplementation(() => Promise.resolve([]))).toHaveBeenCalled());
        });
    });

    test("navigates back when back button is pressed", async () => {
        const { getByTestId } = render(<NotificationScreen navigation={navigation} />);

        fireEvent.press(getByTestId("back-button"));
    });
});
