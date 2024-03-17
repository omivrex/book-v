import { act, fireEvent, render, waitFor } from "../renderer";
import SettingsScreen from "../../screens/main/Settings.screen";

import { navigation, route } from "../_mocks_/navigation.mock";
import { updateProfileInfo, validateUpdateData } from "../../utilities/profile.utility";
import { UserDataType } from "../../types/profile.types";

jest.mock("../../utilities/profile.utility", () => ({
    validateUpdateData: jest.fn(() => true),
    updateProfileInfo: jest.fn(),
}));

describe("SettingsScreen component", () => {
    test("renders input fields and buttons", async () => {
        const { getByPlaceholderText, getByTestId } = render(<SettingsScreen navigation={navigation} route={route} />);
        await act(async () => {
            expect(getByPlaceholderText("Enter your full name")).toBeTruthy();
            expect(getByPlaceholderText("Enter your email")).toBeTruthy();
            expect(getByPlaceholderText("Enter your phone number")).toBeTruthy();
            expect(getByPlaceholderText("Enter your Business name")).toBeTruthy();
            expect(getByTestId("update-button")).toBeTruthy();
        });
    });

    test("validates user input before updating", async () => {
        const { getByPlaceholderText, getByTestId } = render(<SettingsScreen navigation={navigation} route={route} />);
        await act(async () => {
            fireEvent(getByPlaceholderText("Enter your email"), "change", { nativeEvent: { text: "valid-email@example.com" } });
            fireEvent(getByPlaceholderText("Enter your phone number"), "change", { nativeEvent: { text: "7084973299" } });
            fireEvent(getByPlaceholderText("Enter your full name"), "change", { nativeEvent: { text: "John Doe" } });
            fireEvent(getByPlaceholderText("Enter your Business name"), "change", { nativeEvent: { text: "Doe Enterprises" } });
            fireEvent.press(getByTestId("update-button"));
            await waitFor(() => expect(validateUpdateData).toHaveBeenCalled());
        });
    });
});
