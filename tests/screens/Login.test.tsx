import { fireEvent, render, act } from "../renderer";
import React from "react";
import LoginScreen from "../../screens/auth/Login.screen";

import * as authUtility from "../../utilities/auth.utility";
import { navigation } from "../_mocks_/navigation.mock";

const mockedAuthUtility = jest.mock("../../utilities/auth.utility");

describe("LoginScreen component", () => {
    test("renders email and password inputs", () => {
        const { getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

        expect(getByPlaceholderText("Enter your email")).toBeTruthy();
        expect(getByPlaceholderText("Provide a password")).toBeTruthy();
    });

    test("validates email and password before submitting", async () => {
        const { getByTestId, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

        const validateSpy = jest.spyOn(authUtility, "validateSignupInputs");

        fireEvent(getByPlaceholderText("Enter your email"), "change", { nativeEvent: { text: "test@example.com" } });
        fireEvent(getByPlaceholderText("Provide a password"), "change", { nativeEvent: { text: "password123" } });

        await act(async () => {
            fireEvent.press(getByTestId("signin-button"));
            expect(validateSpy).toHaveBeenCalled();
            validateSpy.mockRestore();
        });
    });

    test("navigates to sign up screen from login screen", () => {
        const { getByText } = render(<LoginScreen navigation={navigation} />);

        fireEvent.press(getByText("Signup"));

        expect(navigation.navigate).toHaveBeenCalledWith("Signup");
    });

    // test("calls login function when sign in button is clicked", async () => {
    //     const { getByTestId, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

    //     await act(async () => {
    //         fireEvent(getByPlaceholderText("Enter your email"), "change", { nativeEvent: { text: "test@example.com" } });
    //         fireEvent(getByPlaceholderText("Provide a password"), "change", { nativeEvent: { text: "password123" } });

    //         const loginMock = jest.fn(authUtility.login);
    //         // const login = mockedAuthUtility.fn(loginMock);
    //         loginMock();
    //         fireEvent.press(getByTestId("signin-button"));
    //         expect(loginMock).toHaveBeenCalled();
    //         // login.mockRestore();
    //     });
    // });
});
