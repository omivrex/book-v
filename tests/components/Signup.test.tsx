import { fireEvent, render, act } from "../renderer";
import React from "react";
import SignupScreen from "../../screens/auth/Signup.screen";

import * as authUtility from "../../utilities/auth.utility";
import { SignupDataType } from "../../types/auth.types";
import { navigation } from "../_mocks_/navigation.mock";

describe("SignupScreen component", () => {
    test("renders input fields for fullname, email, password, phone, location, and businessname", async () => {
        const { getByPlaceholderText } = render(<SignupScreen navigation={navigation} />);

        await act(async () => {
            expect(getByPlaceholderText("Enter your full name")).toBeTruthy();
            expect(getByPlaceholderText("Enter your email")).toBeTruthy();
            expect(getByPlaceholderText("Enter your phone number")).toBeTruthy();
            expect(getByPlaceholderText("Provide a password")).toBeTruthy();
            expect(getByPlaceholderText("Enter your Businessname name")).toBeTruthy();
            expect(getByPlaceholderText("Enter your business location")).toBeTruthy();
        });
    });

    test("navigates back to login when back button is  pressed", async () => {
        const { getByTestId } = render(<SignupScreen navigation={navigation} />);

        await act(async () => {
            fireEvent.press(getByTestId("back-button"));
        });
        expect(navigation.goBack).toHaveBeenCalled();
    });

    test("validates email", () => {
        // Test valid email
        const validFormData = {
            fullName: "John Doe",
            email: "test@example.com",
            phone: "9067893423",
            password: "password",
            businessName: "My Business",
            location: { long: 0, lat: 0, name: "Business Address" },
            accountType: "VENDOR",
        };
        expect(authUtility.validateSignupInputs(validFormData as SignupDataType)).toBe(true);

        // Test invalid email
        const invalidEmailFormData = { ...validFormData, email: "invalid-email" };
        expect(authUtility.validateSignupInputs(invalidEmailFormData as SignupDataType)).toBe(false);
    });

    test("validates phone number", () => {
        // Test valid phone number
        const validFormData = {
            fullName: "John Doe",
            email: "test@example.com",
            phone: "9067893423",
            password: "password",
            businessName: "My Business",
            location: { long: 0, lat: 0, name: "Business Address" },
            accountType: "VENDOR",
        };
        expect(authUtility.validateSignupInputs(validFormData as SignupDataType)).toBe(true);

        // Test invalid phone number
        const invalidPhoneFormData = { ...validFormData, phone: "50555555555" };
        expect(authUtility.validateSignupInputs(invalidPhoneFormData as SignupDataType)).toBe(false);
    });

    test("validates password", () => {
        // Test valid password
        const validFormData = {
            fullName: "John Doe",
            email: "test@example.com",
            phone: "9067893423",
            password: "password",
            businessName: "My Business",
            location: { long: 0, lat: 0, name: "Business Address" },
            accountType: "VENDOR",
        };
        expect(authUtility.validateSignupInputs(validFormData as SignupDataType)).toBe(true);

        // Test empty password
        const emptyPasswordFormData = { ...validFormData, password: "" };
        expect(authUtility.validateSignupInputs(emptyPasswordFormData as SignupDataType)).toBe(false);
    });

    test("validates full name", () => {
        // Test valid full name
        const validFormData = {
            fullName: "John Doe",
            email: "test@example.com",
            phone: "9067893423",
            password: "password",
            businessName: "My Business",
            location: { long: 0, lat: 0, name: "Business Address" },
            accountType: "VENDOR",
        };
        expect(authUtility.validateSignupInputs(validFormData as SignupDataType)).toBe(true);

        // Test empty full name
        const emptyNameFormData = { ...validFormData, fullName: "" };
        expect(authUtility.validateSignupInputs(emptyNameFormData as SignupDataType)).toBe(false);
    });

    test("validates business name", () => {
        // Test valid business name
        const validFormData = {
            fullName: "John Doe",
            email: "test@example.com",
            phone: "9067893423",
            password: "password",
            businessName: "My Business",
            location: { long: 0, lat: 0, name: "Business Address" },
            accountType: "VENDOR",
        };
        expect(authUtility.validateSignupInputs(validFormData as SignupDataType)).toBe(true);

        // Test empty business name
        const emptyBusinessNameFormData = { ...validFormData, businessName: "" };
        expect(authUtility.validateSignupInputs(emptyBusinessNameFormData as SignupDataType)).toBe(false);
    });

    test("validates location", () => {
        // Test valid location
        const validFormData = {
            fullName: "John Doe",
            email: "test@example.com",
            phone: "9067893423",
            password: "password",
            businessName: "My Business",
            location: { long: 0, lat: 0, name: "Business Address" },
            accountType: "VENDOR",
        };
        expect(authUtility.validateSignupInputs(validFormData as SignupDataType)).toBe(true);

        // Test empty location
        const emptyLocationFormData = { ...validFormData, location: null };
        expect(authUtility.validateSignupInputs(emptyLocationFormData as SignupDataType)).toBe(false);
    });

    test("validates presence of account type", () => {
        // Test presence of account type (VENDOR)
        const validVendorFormData = {
            fullName: "John Doe",
            email: "test@example.com",
            phone: "9067893423",
            password: "password",
            businessName: "My Business",
            location: { long: 0, lat: 0, name: "Business Address" },
            accountType: "VENDOR",
        };
        expect(authUtility.validateSignupInputs(validVendorFormData as SignupDataType)).toBe(true);

        // Test absence of account type
        const formDataWithoutAccountType = { ...validVendorFormData, accountType: "" };
        expect(authUtility.validateSignupInputs(formDataWithoutAccountType as SignupDataType)).toBe(false);
    });

    test("ensures validation is done before submitting", async () => {
        const { getByTestId, getByPlaceholderText } = render(<SignupScreen navigation={navigation} />);
        await act(async () => {
            const validateSpy = jest.spyOn(authUtility, "validateSignupInputs");

            fireEvent.press(getByTestId("signup-button"));

            expect(validateSpy).toHaveBeenCalled();

            validateSpy.mockRestore();
        });
    });
});
