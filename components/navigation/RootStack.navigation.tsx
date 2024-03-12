import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackType } from "../../types/navigation.types";
import AuthStack from "./AuthStack.navigation";
import MainTabNav from "./MainTab.navigation";

const Stack = createNativeStackNavigator<RootStackType>();

export default function RootStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Main" component={MainTabNav} />
        </Stack.Navigator>
    );
}
