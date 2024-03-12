import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackType } from "../../types/navigation.types";
import LoginScreen from "../screens/auth/Login.screen";
import SignupScreen from "../screens/auth/Signup.screen";

const Stack = createNativeStackNavigator<AuthStackType>();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}
