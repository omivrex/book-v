import { fireEvent, render, act } from "../renderer";
import React from "react";
import LoginScreen from "../../screens/auth/Login.screen";

import * as authUtility from "../../utilities/auth.utility";
import { navigation } from "../_mocks_/navigation.mock";
import { CommonActions } from "@react-navigation/native";
import { UserDataType } from "../../types/profile.types";

jest.mock("../../utilities/auth.utility", () => ({
    ...jest.requireActual("../../utilities/auth.utility"),
    validateSignupInputs: jest.fn(() => true),
    login: jest.fn(() =>
        Promise.resolve<UserDataType>({
            fullName: "John Smith",
            email: "test@example.com",
            phone: "0700000000",
            location: {
                long: 0,
                lat: 0,
                name: "Business Address",
            },
            businessName: "John Smith Enterprise",
            accountType: "VENDOR",
        })
    ),
}));

describe("LoginScreen component", () => {
    test("renders email and password inputs", () => {
        const { getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

        expect(getByPlaceholderText("Enter your email")).toBeTruthy();
        expect(getByPlaceholderText("Provide a password")).toBeTruthy();
    });

    test("validates email and password before submitting", async () => {
        const { getByTestId, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);
        await act(async () => {
            fireEvent(getByPlaceholderText("Enter your email"), "change", { nativeEvent: { text: "invalid-email" } });
            fireEvent(getByPlaceholderText("Provide a password"), "change", { nativeEvent: { text: "" } });

            fireEvent.press(getByTestId("signin-button"));

            expect(authUtility.login).not.toHaveBeenCalled();
        });
    });

    test("navigates to sign up screen from login screen", async () => {
        const { getByText } = render(<LoginScreen navigation={navigation} />);
        await act(async () => {
            fireEvent.press(getByText("Signup"));
            expect(navigation.navigate).toHaveBeenCalledWith("Signup");
        });
    });

    test("navigates to main after login is completed", async () => {
        const { getByTestId, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);
        await act(async () => {
            fireEvent(getByPlaceholderText("Enter your email"), "change", { nativeEvent: { text: "test@example.com" } });
            fireEvent(getByPlaceholderText("Provide a password"), "change", { nativeEvent: { text: "password123" } });
            fireEvent.press(getByTestId("signin-button"));
            expect(authUtility.validateSignupInputs).toHaveReturnedWith(true);
            expect(navigation.dispatch).toHaveBeenCalledWith(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Main" }],
                })
            );
        });
    });

    test("calls login function when sign in button is clicked", async () => {
        const { getByTestId, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

        await act(async () => {
            fireEvent(getByPlaceholderText("Enter your email"), "change", { nativeEvent: { text: "test@example.com" } });
            fireEvent(getByPlaceholderText("Provide a password"), "change", { nativeEvent: { text: "password123" } });

            fireEvent.press(getByTestId("signin-button"));
            expect(authUtility.login).toHaveBeenCalledWith("test@example.com", "password123");
        });
    });
});
