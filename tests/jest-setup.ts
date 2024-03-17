import "react-native-gesture-handler/jestSetup";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
// Mock the react-native-firebase-auth module
jest.mock("@react-native-firebase/auth", () => require("./_mocks_/react-native-firebase-auth.mock"));

jest.mock("@react-native-async-storage/async-storage", () => require("@react-native-async-storage/async-storage/jest/async-storage-mock"));
