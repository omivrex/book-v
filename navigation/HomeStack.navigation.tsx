import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackType } from "../types/navigation.types";
import HomeScreen from "../screens/main/Home.screen";
import NotificationScreen from "../screens/main/Notifications.screen";

const Stack = createNativeStackNavigator<HomeStackType>();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
        </Stack.Navigator>
    );
}
